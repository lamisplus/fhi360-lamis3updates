import { Component, OnInit, ViewChild } from '@angular/core';
import { Laboratory, LaboratoryLine, LabTest, LabTestCategory, Patient } from '../model/laboratory.model';
import { LaboratoryService } from '../services/laboratory.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { MatButton, MatProgressBar } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { AppLoaderService, entityCompare } from '@lamis/web-core';
import { TdDialogService } from '@covalent/core';

const moment = moment_;

@Component({
    selector: 'lamis-laboratory-edit',
    templateUrl: './laboratory-edit.component.html'
})
export class LaboratoryEditComponent implements OnInit {
    @ViewChild(MatProgressBar, {static: true}) progressBar: MatProgressBar;
    @ViewChild(MatButton, {static: true}) submitButton: MatButton;
    entity: Laboratory = {};
    patient: Patient;
    dateRegistration: Moment;
    minAssayDate: Moment;
    minReportedDate: Moment;
    maxNextVisit = moment().add(200, 'days');
    categories: LabTestCategory[] = [];
    tests: LabTest[] = [];
    selectedTests: LabTest[] = [];
    isSaving: boolean;
    error = false;
    tomorrow = moment().add(1, 'days');
    today = moment();
    ColumnMode = ColumnMode;
    editing = {};
    errors = {};
    rows: LaboratoryLine[] = [];
    labTestIds = new Set();
    visitDates: Moment[] = [];

    constructor(private laboratoryService: LaboratoryService,
                protected notification: NotificationService,
                private appLoaderService: AppLoaderService,
                private _dialogService: TdDialogService,
                protected activatedRoute: ActivatedRoute) {
    }

    createEntity(): Laboratory {
        return <Laboratory>{};
    }

    ngOnInit(): void {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.laboratoryService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.patient = res;
                this.dateRegistration = res.dateRegistration;
                this.entity.facility = res.facility;
                this.laboratoryService.getVisitDatesByPatient(res.id).subscribe((res) => {
                    this.visitDates = res;
                });
                this.minReportedDate = this.entity.patient.dateRegistration.clone().add(0, 'days');
                this.minAssayDate = this.entity.patient.dateRegistration.clone().add(0, 'days');

                if (this.entity.id) {
                    this.updateMinDates();
                }
            });

            if (this.entity.id) {
                this.updateMinDates();
                this.laboratoryService.getLinesByLaboratory(this.entity.id)
                    .subscribe((res: LaboratoryLine[]) => {
                        this.rows = res.map(r => {
                            this.laboratoryService.getLabTestById(r.labTest.id).subscribe(res => {
                                if (!this.tests.map(r => r.id).includes(r.labTest.id)) {
                                    this.tests.push(res);
                                    this.selectedTests.push(res);
                                    this.tests = [...this.tests];
                                    this.selectedTests = [...this.selectedTests];
                                }
                                r.result = r.result || '';
                            });
                            return r;
                        });
                    });
            }

            this.laboratoryService.laboratoryCategories().subscribe(res => this.categories = res);
        });
    }

    updateMinDates() {
        this.minAssayDate = this.entity.dateSampleCollected.clone().add(0, 'days');
        if (this.entity.dateAssay) {
            this.minReportedDate = this.entity.dateAssay.clone().add(0, 'days');
        } else {
            this.minReportedDate = this.entity.dateSampleCollected.clone().add(1, 'days');
        }
    }

    filterDates(date: Moment): boolean {
        let exists = false;

        this.visitDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateSampleCollected, 'days') === 0) || !exists;
    }


    previousState() {
        window.history.back();
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2)
    }

    sampleDateChanged(date: Moment) {
        this.minAssayDate = date.clone().add(0, 'days');
    }

    assayDateChanged(date: Moment) {
        this.minReportedDate = date.clone().add(0, 'days');
    }

    edit(rowIndex) {
        this.editing[rowIndex + ''] = true;
    }

    save() {
        this.isSaving = true;
        let abort = false;
        //this.progressBar.mode = 'indeterminate';
        this.rows.forEach(line => {
            if (line.labTest.id === 16 && !line.indication) {
                this._dialogService.openAlert({
                    title: 'Indication is required',
                    message: 'Please select indication for Viral Load Test',
                    disableClose: true
                });
                this.isSaving = false;
                abort = true;
            }
            if (line.labTest.id !== 16 && line.indication) {
                line.indication = null
            }
            if (this.entity.dateAssay && !line.result) {
                this._dialogService.openAlert({
                    title: 'Result is required',
                    message: 'Please provide test result',
                    disableClose: true
                });
                this.isSaving = false;
                abort = true;
            }
            if (line.result && !this.entity.dateAssay) {
                this.isSaving = false;
                abort = true;
                this._dialogService.openAlert({
                    title: 'Form not complete',
                    message: 'Please provide Date of Test Assay',
                    disableClose: true
                });
            }
            const result = parseInt(line.result);
            if ((line.labTest.id === 16 || line.labTest.id === 1) && this.entity.dateAssay && result < 0) {
                this._dialogService.openAlert({
                    title: 'Result is invalid',
                    message: 'Please provide numeric value (>=0) result for test',
                    disableClose: true
                });
                this.isSaving = false;
                abort = true;
            } else {
                line.result = result.toString();
            }
        });

        if (abort) {
            return;
        }
        this.appLoaderService.open('Saving request...');
        this.entity.lines = this.rows;

        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.laboratoryService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.laboratoryService.create(this.entity));
        }
    }

    categoryChanged(type: any) {
        this.laboratoryService.labTestsByCategory(type.id).subscribe((res: LabTest[]) => {
            res.forEach((labTest: LabTest) => {
                if (!this.tests.map(r => r.id).includes(labTest.id)) {
                    this.tests.push(labTest);
                    this.tests = [...this.tests]
                }
            })
        })
    }

    testChanged(event) {
        this.selectedTests.forEach(labTest => {
            if (!this.labTestIds.has(labTest.id)) {
                this.rows.push({
                    labTest: labTest,
                    result: ''
                });
                this.rows = [...this.rows];
                this.labTestIds.add(labTest.id);
            }
            this.rows = this.rows.filter(row => this.selectedTests.map(test => test.id).includes(row.labTest.id));
            this.labTestIds.forEach(id => {
                if (!this.rows.map(r => r.labTest.id).includes(id)) {
                    this.labTestIds.delete(id);
                }
            })
        })
    }

    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = cell === 'indication' ? event : event.target.value;
        this.errors[rowIndex + '-result'] = this.entity.dateAssay && !this.rows[rowIndex][cell];
        this.errors[rowIndex + '-indication'] = this.rows[rowIndex].labTest.id === 16 && !this.rows[rowIndex]['indication'];
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe(
            (res: HttpResponse<any>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => {
                this.appLoaderService.close();
                this.onSaveError();
                this.onError(res.message)
            });
    }

    private onSaveSuccess(result: any) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Laboratory request successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving laboratory request');
    }

    protected onError(errorMessage: string) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
}

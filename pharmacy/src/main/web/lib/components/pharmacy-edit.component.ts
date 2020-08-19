import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Adr,
    Devolve,
    Drug,
    DrugDTO,
    Patient,
    Pharmacy,
    PharmacyLine,
    Regimen,
    RegimenType
} from '../model/pharmacy.model';
import { PharmacyService } from '../services/pharmacy.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { MatButton, MatProgressBar } from '@angular/material';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { AppLoaderService, entityCompare } from '@lamis/web-core';

const moment = moment_;

@Component({
    selector: 'lamis-pharmacy-edit',
    templateUrl: './pharmacy-edit.component.html'
})
export class PharmacyEditComponent implements OnInit {
    @ViewChild(MatProgressBar, {static: true}) progressBar: MatProgressBar;
    @ViewChild(MatButton, {static: true}) submitButton: MatButton;
    entity: Pharmacy = {};
    patient: Patient;
    dateRegistration: Moment;
    maxNextVisit: Moment;
    regimenTypes: RegimenType[] = [];
    regimens: Regimen[] = [];
    selectedRegimens: Regimen[] = [];
    adrs: Adr[];
    isSaving: boolean;
    error = false;
    tomorrow = moment().add(1, 'days');
    today = moment();
    minNextAppointment: Moment;
    ColumnMode = ColumnMode;
    editing = {};
    rows: PharmacyLine[] = [];
    drugIds = new Set();
    visitDates: Moment[] = [];
    devolve: Devolve;
    dmocType: string;
    drugs: Drug[] = [];

    constructor(private pharmacyService: PharmacyService,
                protected notification: NotificationService,
                private appLoaderService: AppLoaderService,
                protected activatedRoute: ActivatedRoute) {
    }

    createEntity(): Pharmacy {
        return <Pharmacy>{};
    }

    ngOnInit(): void {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.patient = res;
                this.dateRegistration = res.dateRegistration;
                this.entity.facility = res.facility;
                this.minNextAppointment = this.dateRegistration.clone().add(15, 'days');
                this.pharmacyService.getVisitDatesByPatient(res.id).subscribe((res) => {
                    this.visitDates = res;
                });
            });

            if (this.entity.id) {
                this.pharmacyService.getLinesByPharmacy(this.entity.id)
                    .subscribe((res: PharmacyLine[]) => {
                        this.rows = res.map(r => {
                            r.quantity = (r.morning + r.afternoon + r.evening) * r.duration;

                            this.pharmacyService.getRegimenById(r.regimen.id).subscribe(res => {
                                if (!this.regimens.map(r => r.id).includes(r.regimen.id)) {
                                    this.regimens.push(res);
                                    this.selectedRegimens.push(res);
                                    this.regimens = [...this.regimens];
                                    this.selectedRegimens = [...this.selectedRegimens];
                                }
                            });
                            return r;
                        });

                        this.entity.duration = res.map(r => r.duration)
                            .sort((r1, r2) => r1 - r2)
                            .pop();
                    });
                this.pharmacyService.getDevolvement(this.entity.patient.id, this.entity.dateVisit).subscribe(res => {
                    this.devolve = res;
                    this.updateDmocType();
                });
            }

            this.pharmacyService.regimenTypes().subscribe(res => this.regimenTypes = res);
        });
    }

    dateVisitChanged(date: Moment) {
        this.entity.nextAppointment = this.suggestedNextAppointment();
        this.minNextAppointment = this.entity.nextAppointment.clone().subtract(7, 'days');
        this.maxNextVisit = this.entity.nextAppointment.clone().add(180, 'days');
        this.pharmacyService.getDevolvement(this.entity.patient.id, this.entity.dateVisit).subscribe(res => {
            this.devolve = res;
            this.updateDmocType();
        });

    }

    suggestedNextAppointment(): Moment {
        if (this.entity.dateVisit) {
            let nextAppointment = this.entity.dateVisit.clone().add(this.entity.duration - 2 || 13, 'days');
            const weekday = nextAppointment.isoWeekday();
            if (weekday === 6) {
                nextAppointment = nextAppointment.clone().add(2, 'days');
            } else if (weekday === 7) {
                nextAppointment = nextAppointment.clone().add(1, 'days');
            }
            return nextAppointment;
        }
        return null;
    }

    updateDmocType() {
        let type = 'MMD';
        switch (this.devolve.dmocType) {
            case 'ARC':
                type = 'Adolescent Refill Club';
                break;
            case 'CPARP':
                type = 'CPARP';
                break;
            case 'CARC':
                type = 'CARC';
                break;
            case 'F_CARG':
                type = 'F-CARG';
                break;
            case 'FAST_TRACK':
                type = 'Fast Track';
                break;
            case 'S_CARG':
                type = 'S-CARG';
                break;
            case 'MMS':
                type = 'MMS';
                break;
        }
        this.dmocType = type;
    }

    filterDates(date: Moment): boolean {
        let exists = false;

        this.visitDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateVisit, 'days') === 0) || !exists;
    }


    previousState() {
        window.history.back();
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2)
    }

    save() {
        this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.appLoaderService.open('Saving visit...');
        this.entity.lines = this.rows;
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.pharmacyService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.pharmacyService.create(this.entity));
        }
    }

    regimenTypeChange(type: any) {
        this.pharmacyService.regimesByRegimenType(type.id).subscribe((res: Regimen[]) => {
            res.forEach((regimen: Regimen) => {
                if (!this.regimens.map(r => r.id).includes(regimen.id)) {
                    this.regimens.push(regimen);
                    this.regimens = [...this.regimens]
                }
            })
        })
    }

    durationChanged(duration) {
        this.rows = this.rows.map(r => {
            r.duration = duration;
            r.quantity = (r.morning + r.afternoon + r.evening) * duration;
            return r;
        });
        this.rows = [...this.rows];

        this.entity.nextAppointment = this.suggestedNextAppointment();

        if (duration === 90) {
            this.entity.mmdType = 'MMD-3';
        } else if (duration === 120) {
            this.entity.mmdType = 'MMD-4';
        } else if (duration === 150) {
            this.entity.mmdType = 'MMD-5';
        } else if (duration === 180) {
            this.entity.mmdType = 'MMD-6';
        } else {
            this.entity.mmdType = null;
        }
    }

    regimenChange(event) {
        this.selectedRegimens.forEach(regimen => {
            this.pharmacyService.getDrugsByRegimen(regimen.id).subscribe((res: DrugDTO[]) => {
                res.forEach((drug: DrugDTO) => {
                    console.log('Drug', drug, this.rows);
                    if (!this.rows.map(r => r.drug.id).includes(drug.drug.id)) {
                        this.rows.push({
                            drug: drug.drug,
                            description: drug.drug.name,
                            morning: drug.drug.morning,
                            afternoon: drug.drug.afternoon,
                            evening: drug.drug.evening,
                            regimen: regimen,
                            duration: this.entity.duration,
                            quantity: this.entity.duration * (drug.drug.morning + drug.drug.afternoon + drug.drug.evening),
                            regimenType: regimen.regimenType,
                            regimenDrug: drug.regimenDrug
                        });
                        this.rows = [...this.rows];
                        //this.drugs.push(drug.drug);
                    }

                    this.rows = this.rows.filter(row => this.selectedRegimens.map(regimen => regimen.id).includes(row.regimen.id));
                    this.drugs.forEach(drug => {
                        if (!this.rows.map(r => r.drug.id).includes(drug.id)) {
                            this.drugs = this.drugs.filter(d => d.id !== drug.id)
                        }
                    })
                });
            })
        })
    }

    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        if (this.entity.duration) {
            const total = parseInt(this.rows[rowIndex]['morning'] + '' || '0') + parseInt(this.rows[rowIndex]['afternoon'] + '' || '0') +
                parseInt(this.rows[rowIndex]['evening'] + '' || '0');
            this.rows[rowIndex]['quantity'] = (total * this.entity.duration);
        }
        this.rows = [...this.rows];
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
        this.notification.showInfo('Pharmacy visit successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving pharmacy visit');
    }

    protected onError(errorMessage: string) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
}

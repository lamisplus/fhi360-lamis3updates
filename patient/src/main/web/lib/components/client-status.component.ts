import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@alfresco/adf-core';
import { AppLoaderService } from '@lamis/web-core';
import { Patient, StatusHistory } from '../model/patient.model';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const moment = moment_;

@Component({
    selector: 'client-status',
    templateUrl: './client-status.component.html'
})
export class ClientStatusComponent implements OnInit {
    isSaving: boolean;
    entity: StatusHistory;
    patient: Patient;
    status: string;
    facilities: string[] = [];
    facilityTransferredTo: string;
    statusDates: Moment[] = [];
    today = moment();
    statuses = ['TRACED_UNABLE_TO_LOCATE', 'TRACED_AGREED_TO_RETURN_TO_CARE', 'DID_NOT_ATTEMPT_TO_TRACE'];

    constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute, private router: Router,
                private notification: NotificationService, private appLoaderService: AppLoaderService) {
    }

    createEntity(): StatusHistory {
        return <StatusHistory>{};
    }

    ngOnInit(): void {
        this.isSaving = false;
        this.patientService.getActiveFacility().subscribe(fac => {
            this.patientService.getAllFacility().subscribe(res => {
                this.facilities = res.map(f => f.name).filter(f => f != fac.name);
            });
        });
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.patientService.findByUuid(patientId).subscribe((res) => {
                this.entity.patient = res.body;
                this.patient = res.body;
                this.entity.facility = res.body.facility;
                this.patientService.getStatusDatesByPatient(res.body.id).subscribe((res) => {
                    this.statusDates = res;
                });
            });

            if (this.entity.id) {
                this.patientService.getStatusName(this.entity.id).subscribe(res => this.status = res);

                if (this.entity && this.entity.extra) {
                    this.facilityTransferredTo = this.entity.extra.facilityTransferredTo;
                }
            }
        });
    }

    change(input: string) {
        if (input) {
            this.facilities = this.facilities.filter(f => f.toLowerCase().includes(input.toLowerCase()))
        }
    }

    filterDates(date: Moment): boolean {
        let exists = false;

        this.statusDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateStatus, 'days') === 0) || !exists;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.appLoaderService.open('Saving Client status update...');
        this.isSaving = true;
        if (!this.entity.extra) {
            this.entity.extra = {}
        }
        this.entity.extra.facilityTransferredTo = this.facilityTransferredTo;

        if (this.statuses.includes(this.entity.status)) {
            this.entity.outcome = this.entity.status;
            this.entity.status = null;
        }
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.patientService.updateClientStatus(this.entity));
        } else {
            this.subscribeToSaveResponse(this.patientService.saveClientStatus(this.entity));
        }
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
        this.notification.showInfo('Client status update successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.notification.showError('Error saving status update');
    }

    protected onError(errorMessage: string) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
}

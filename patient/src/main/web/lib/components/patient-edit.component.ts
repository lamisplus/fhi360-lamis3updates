import { Component, OnInit } from '@angular/core';
import { OVC, Patient } from '../model/patient.model';
import { PatientService } from '../services/patient.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment_ from 'moment';
import { DurationInputArg2, Moment } from 'moment';
import { AppLoaderService, DATE_FORMAT, entityCompare } from '@lamis/web-core';
import { TdDialogService } from '@covalent/core';

const moment = moment_;

@Component({
    selector: 'lamis-patient-edit',
    templateUrl: './patient-edit.component.html'
})
export class PatientEditComponent implements OnInit {
    template = 'patient-edit';
    entity: Patient;
    ovc: OVC = {};
    patient: Patient;
    isSaving: boolean;
    error = false;
    today = moment();
    minDob = moment().subtract(75, 'years');
    ovcMin: Moment;
    minDateRegistration: Moment = moment('1998', 'YYYY');
    maxDateBirth: Moment = moment().subtract(2, 'months');
    maxDateConfirmed = moment();
    minDateConfirmed = moment('1998', 'YYYY');
    age: number;
    ageUnit: DurationInputArg2;
    state: any;
    states: any[];
    lgas: any[];
    ovcApplicable = false;
    householdUniqueNo: string;
    referredTo: string;
    dateReferredTo: Moment;
    referredFrom: string;
    dateReferredFrom: Moment;

    constructor(private patientService: PatientService,
                protected notification: NotificationService,
                private loaderService: AppLoaderService,
                private _dialogService: TdDialogService,
                protected activatedRoute: ActivatedRoute) {
    }

    createEntity(): Patient {
        return <Patient>{};
    }

    ngOnInit(): void {
        this.patientService.getActiveFacility().subscribe((res: any) => {
            this.entity.facility = res;
        });
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            if (this.entity.id) {
                this.ovcMin = this.entity.dateBirth.clone();
            }
            if (this.entity.id && this.entity.lga) {
                this.minDateRegistration = this.entity.dateBirth.clone().add(2, 'month');
                this.minDateConfirmed = this.entity.dateBirth.clone().add(1, 'month');
                this.patientService.getStateByLga(this.entity.lga.id).subscribe(res => {
                    this.state = res;
                    this.stateChange(this.state.id);
                })
            }
            if (this.entity.extra && this.entity.extra.ovc) {
                this.ovc.householdUniqueNo = this.entity.extra.ovc.householdUniqueNo;
                this.ovc.referredTo = this.entity.extra.ovc.referredTo;
                this.ovc.referredFrom = this.entity.extra.ovc.referredFrom;
                if (!!this.entity.extra.ovc.dateReferredTo) {
                    this.ovc.dateReferredTo = moment(this.entity.extra.ovc.dateReferredTo);
                }

                if (!!this.entity.extra.ovc.dateReferredFrom) {
                    this.ovc.dateReferredFrom = moment(this.entity.extra.ovc.dateReferredFrom);
                }
                if (!this.entity.extra.ovc.servicesProvided) {
                    this.ovc.servicesProvided = [];
                }
            }
            const date = this.entity.dateBirth && this.entity.dateBirth.clone() || moment('1998-01-01', 'YYYY-MM-DD');
            if (!moment().subtract(17, 'years').isAfter(date)) {
                this.ovcApplicable = true;
            }
        });

        this.patientService.getStates().subscribe(res => this.states = res);
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }

    estimateDob() {
        if (this.age && this.ageUnit && this.entity.dateRegistration) {
            const dateRegistration = this.entity.dateRegistration;
            this.entity.dateBirth = dateRegistration.clone().subtract(this.age, this.ageUnit);
            this.ovcMin = this.entity.dateBirth.clone();
            this.minDateConfirmed = this.entity.dateBirth.clone().add(1, 'months');
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }

    stateChange(id) {
        this.patientService.getLgasByState(id).subscribe(res => this.lgas = res)
    }

    previousState() {
        window.history.back();
    }

    dateBirthChanged(date: Moment) {
        this.minDateRegistration = date.clone().add(2, 'months');
        this.minDateConfirmed = date.clone().add(1, 'months');
        if (this.minDateRegistration.isBefore(moment('1998', 'YYYY'), 'day')) {
            this.minDateRegistration = moment('1998', 'YYYY');
            this.minDateConfirmed = moment('1998', 'YYYY');
        }
        this.ovcMin = date.clone();
        if (!!this.entity.dateRegistration) {
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }

    dateRegistrationChanged(date: Moment) {
        this.maxDateBirth = date.clone().subtract(2, 'months');
        this.maxDateConfirmed = date.clone();

        if (!!this.entity.dateBirth) {
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }

    save() {
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        if (this.ovcApplicable) {
            if (!this.entity.extra) {
                this.entity.extra = {};
            }
            this.entity.extra.ovc = {};
            this.entity.extra.ovc = this.ovc;
            this.entity.extra.ovc.dateReferredFrom = this.ovc.dateReferredFrom != null && this.ovc.dateReferredFrom.isValid() ?
                this.ovc.dateReferredFrom.format(DATE_FORMAT) : null;
            this.entity.extra.ovc.dateReferredTo = this.ovc.dateReferredTo != null && this.ovc.dateReferredTo.isValid() ?
                this.ovc.dateReferredTo.format(DATE_FORMAT) : null;

            if (!!this.ovc.householdUniqueNo && !(!!this.ovc.referredFrom || !!this.ovc.referredTo)) {
                this._dialogService.openAlert({
                    title: 'OVC Partner is required',
                    message: 'Please indicate either OVC Partner transferred to or from',
                    disableClose: true
                });

                return
            }

            if ((!!this.ovc.referredTo || !!this.ovc.referredFrom) && !this.ovc.householdUniqueNo) {
                this._dialogService.openAlert({
                    title: 'Household number is required',
                    message: 'Please indicate Household Unique No',
                    disableClose: true
                });

                return
            }

            if (!!this.ovc.referredFrom && !!this.ovc.referredTo) {
                this._dialogService.openAlert({
                    title: 'OVC Partner mismatch',
                    message: 'Please provide either OVC Partner transfer to or from, not both',
                    disableClose: true
                });

                return
            }
        }
        this.loaderService.open('Saving patient...');
        if (!this.entity.id) {
            if (this.entity.dobEstimated) {
                this.entity.dateBirth = this.entity.dateRegistration.clone().subtract(this.age, this.ageUnit);
            }
            this.subscribeToSaveResponse(this.patientService.create(this.entity));
        } else {
            this.subscribeToSaveResponse(this.patientService.update(this.entity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        this.loaderService.close();
        result.subscribe(
            (res: HttpResponse<any>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.onError(res.message)
            });
    }

    private onSaveSuccess(result: any) {
        this.isSaving = false;
        this.notification.showInfo('Patient successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.error = true;
        //this.progressBar.mode = 'determinate';
    }

    protected onError(errorMessage: string) {
        this.notification.showError(errorMessage);
    }


    isOVCAge() {
        if (this.age && this.ageUnit === 'years') {
            if (this.age >= 10 && this.age <= 24) {
                return true;
            }
        }

        const dob = this.entity.dateBirth.clone();
        const diff = this.entity.dateRegistration.clone().diff(dob);

        return diff >= 10 && diff <= 24;
    }
}

import { Component, OnInit } from '@angular/core';
import {
    Adhere,
    AdverseDrugReaction,
    Clinic,
    ClinicAdverseDrugReaction,
    ClinicVm,
    OpportunisticInfection
} from '../../model/clinic.model';
import { ClinicService } from '../../services/clinic.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment_ from 'moment';
import { Moment } from 'moment';
import { AppLoaderService, DATE_FORMAT, entityCompare } from '@lamis/web-core';
import { ColumnMode } from '@swimlane/ngx-datatable';

const moment = moment_;

@Component({
    selector: 'lamis-clinic-edit',
    templateUrl: './clinic-edit.component.html'
})
export class ClinicEditComponent implements OnInit {
    //@ViewChild(MatProgressBar, {static: true}) progressBar: MatProgressBar;
    //@ViewChild(MatButton, {static: true}) submitButton: MatButton;
    entity: Clinic;
    isSaving: boolean;
    error = false;
    commence: any;
    today = moment();
    lmpMin: Moment;
    appointmentMax: Moment;
    appointmentMin: Moment;
    opportunisticInfections: OpportunisticInfection[];
    adverseDrugReactions: AdverseDrugReaction[];
    adheres: Adhere[];
    regimenLines: any[];
    regimens: any[];
    dateBirth: Moment;
    dateRegistration: Moment;
    visitDates: Moment[] = [];
    selectedClinicAdr: ClinicAdverseDrugReaction[] = [];
    oiList: OpportunisticInfection[] = [];
    adhereList: Adhere[] = [];
    ColumnMode = ColumnMode;
    adr = false;
    enrolledOnOTZ: boolean;
    dateEnrolledOnOTZ: Moment;
    attendedLastOTZMeeting: boolean;
    dateLastOTZMeeting: Moment;
    modulesCompleted: number;
    caregiverPhone: string;
    caregiverAddress: string;
    otzApplicable = false;

    constructor(private clinicService: ClinicService,
                protected notification: NotificationService,
                protected activatedRoute: ActivatedRoute,
                private appLoaderService: AppLoaderService) {
    }

    createEntity(): Clinic {
        return <Clinic>{};
    }

    ngOnInit(): void {
        this.clinicService.opportunisticInfections().subscribe(res => this.opportunisticInfections = res);
        this.clinicService.adheres().subscribe(res => this.adheres = res);
        this.isSaving = false;
        this.clinicService.getRegimenLines().subscribe(res => {
            this.regimenLines = res;
        });
        this.activatedRoute.data.subscribe(({entity}) => {
            this.commence = !!this.activatedRoute.snapshot.data['commence'];

            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');

            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.entity.facility = res.facility;
                this.dateBirth = res.dateBirth;
                this.dateRegistration = res.dateRegistration;

                this.clinicService.enrolledOnOTZ(res.id).subscribe(r => this.enrolledOnOTZ = r);

                if (this.entity.patient.statusAtRegistration === 'ART_TRANSFER_IN') {
                    this.dateRegistration = this.entity.patient.dateRegistration.clone().subtract(10, 'years');
                    if (this.dateRegistration.isBefore(this.entity.patient.dateBirth)) {
                        this.dateRegistration = this.entity.patient.dateBirth.clone().add(3, 'months');
                    }
                }

                this.otzApplicable = !moment().subtract(24, 'years').isAfter(this.entity.patient.dateBirth)
                    && !moment().subtract(10, 'years').isBefore(this.entity.patient.dateBirth);

                this.clinicService.getVisitDatesByPatient(this.entity.patient.id).subscribe((res) => {
                    this.visitDates = res;
                });
            });
            if (this.entity.commence && this.entity.regimenType) {
                this.regimenLineChange(this.entity.regimenType);
            }
            this.commence = this.commence || this.entity.commence;

            if (this.commence) {
                this.entity.commence = true;
                if (this.entity.regimenType) {
                    this.regimenLineChange(this.entity.regimenType);
                }
            }

            if (this.entity.id) {
                this.appointmentMin = this.entity.dateVisit.clone().add(14, 'days');
                this.appointmentMax = this.entity.dateVisit.clone().add(6, 'months');
                this.clinicService.getAdhereByClinic(this.entity.id).subscribe((res) => {
                    this.adhereList = res.map(ca => ca.adhere);
                });
                this.clinicService.adverseDrugReactions().subscribe(res1 => {
                    this.adverseDrugReactions = res1;
                    this.clinicService.getAdverseDrugReactionsByClinic(this.entity.id).subscribe(res => {
                        if (res.body && res.body.length > 0) {
                            this.adr = true;
                        }
                        this.adverseDrugReactions.forEach(adr => {
                            let found = false;
                            if (res.body) {
                                res.body.forEach(cadr => {
                                    if (cadr.adverseDrugReaction.id === adr.id) {
                                        found = true;
                                        this.selectedClinicAdr.push(cadr)
                                    }
                                });
                            }
                            if (!found) {
                                this.selectedClinicAdr.push({
                                    adverseDrugReaction: adr
                                })
                            }
                        });
                        this.selectedClinicAdr = [...this.selectedClinicAdr];
                    });

                    if (this.entity.extra && this.entity.extra.otz) {
                        this.attendedLastOTZMeeting = !!this.entity.extra.otz.attendedLastOTZMeeting;
                        this.enrolledOnOTZ = !!this.entity.extra.otz.enrolledOnOTZ;
                        if (!!this.entity.extra.otz.dateEnrolledOnOTZ) {
                            this.dateEnrolledOnOTZ = moment(this.entity.extra.otz.dateEnrolledOnOTZ);
                        }

                        if (!!this.entity.extra.otz.dateLastOTZMeeting) {
                            this.dateLastOTZMeeting = moment(this.entity.extra.otz.dateLastOTZMeeting);
                        }
                        this.caregiverPhone = this.entity.extra.otz.caregiverPhone;
                        this.caregiverAddress = this.entity.extra.otz.caregiverAddress;
                        this.modulesCompleted = this.entity.extra.otz.modulesCompleted;
                    }
                });
                this.clinicService.getOpportunisticInfectionsByClinic(this.entity.id).subscribe(res => {
                    this.oiList = res.map(co => co.opportunisticInfection)
                })
            } else {
                this.clinicService.adverseDrugReactions().subscribe(res => {
                    this.adverseDrugReactions = res;
                    this.adverseDrugReactions.forEach(adr => {
                        this.selectedClinicAdr.push({
                            adverseDrugReaction: adr
                        })
                    });
                });

                this.selectedClinicAdr = [...this.selectedClinicAdr];
            }
        });
    }

    updateValue(event, cell, row: ClinicAdverseDrugReaction) {
        console.log('Edit', event, cell, row);
        this.selectedClinicAdr = [...this.selectedClinicAdr.map(cadr => {
            if (cadr.adverseDrugReaction.id === row.id) {
                cadr.severity = event;
            }
            return cadr;
        })];
        console.log('UPDATED!', row, event);
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

    dateChanged(date: Moment) {
        this.appointmentMax = date.clone().add(6, 'months');
        this.lmpMin = date.clone().subtract(2, 'years');
        this.appointmentMin = date.clone().add(14, 'days');

        this.otzApplicable = !date.clone().subtract(24, 'years').isAfter(this.entity.patient.dateBirth)
            && !date.clone().subtract(10, 'years').isBefore(this.entity.patient.dateBirth);
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2)
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const vm: ClinicVm = {
            clinic: this.entity,
            adrList: this.selectedClinicAdr.filter(cadr => !!cadr.severity),
            oiList: this.oiList,
            adhereList: this.adhereList
        };
        if (!this.entity.extra) {
            this.entity.extra = {};
        }
        this.entity.extra.otz = {};
        if (!this.enrolledOnOTZ) {
            this.entity.extra.otz.dateEnrolledOnOTZ = null;
            this.entity.extra.otz.attendedLastOTZMeeting = null;
            this.entity.extra.otz.dateLastOTZMeeting = null;
            this.entity.extra.otz.enrolledOnOTZ = null;
            this.entity.extra.otz.caregiverPhone = null;
            this.entity.extra.otz.caregiverAddress = null;
            this.entity.extra.otz.modulesCompleted = null;
        } else {
            this.entity.extra.otz.dateEnrolledOnOTZ = this.dateEnrolledOnOTZ != null && this.dateEnrolledOnOTZ.isValid() ?
                this.dateEnrolledOnOTZ.format(DATE_FORMAT) : null;
            this.entity.extra.otz.attendedLastOTZMeeting = !!this.attendedLastOTZMeeting;
            this.entity.extra.otz.dateLastOTZMeeting = this.dateLastOTZMeeting != null && this.dateLastOTZMeeting.isValid() ?
                this.dateLastOTZMeeting.format(DATE_FORMAT) : null;
            this.entity.extra.otz.enrolledOnOTZ = this.enrolledOnOTZ;
            this.entity.extra.otz.caregiverPhone = this.caregiverPhone;
            this.entity.extra.otz.caregiverAddress = this.caregiverAddress;
            this.entity.extra.otz.modulesCompleted = this.modulesCompleted;
        }
        this.appLoaderService.open('Saving clinic visit..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.clinicService.update(vm));
        } else {
            this.subscribeToSaveResponse(this.clinicService.create(vm));
        }
    }

    regimenLineChange(type: any) {
        this.clinicService.getRegimenByLine(type.id).subscribe(res => this.regimens = res);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe(
            (res: HttpResponse<any>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.onError(res.message)
            });
    }

    private onSaveSuccess(result: any) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Clinic visit successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        this.error = true;
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving clinic visit; try again');
        //this.progressBar.mode = 'determinate';
    }

    protected onError(errorMessage: string) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
}

import { Component, OnInit } from '@angular/core';
import { Biometric, Finger, Patient } from '../model/biometric.model';
import { BiometricService } from '../services/biometric.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment_ from 'moment';
import { AppLoaderService } from '@lamis/web-core';
import { TdDialogService } from '@covalent/core';

const moment = moment_;

@Component({
    selector: 'lamis-biometric-edit',
    templateUrl: './biometric-edit.component.html'
})
export class BiometricEditComponent implements OnInit {
    biometrics: Biometric[] = [];
    patient: Patient;
    isSaving: boolean;
    error = false;
    finger: Finger;
    fingers: Finger[] = [];
    readers: any[];
    reader: any;
    message: string;

    constructor(private biometricService: BiometricService,
                protected notification: NotificationService,
                private appLoaderService: AppLoaderService,
                private _dialogService: TdDialogService,
                protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.fingers.push(Finger.LEFT_INDEX_FINGER);
        this.fingers.push(Finger.LEFT_MIDDLE_FINGER);
        this.fingers.push(Finger.LEFT_THUMB);
        this.fingers.push(Finger.RIGHT_INDEX_FINGER);
        this.fingers.push(Finger.RIGHT_MIDDLE_FINGER);
        this.fingers.push(Finger.RIGHT_THUMB);

        this.isSaving = false;
        const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');

        this.biometricService.getPatient(patientId).subscribe((res) => {
            this.patient = res;

            this.biometricService.findByPatient(this.patient.id).subscribe((res) => {
                if (res.body) {
                    this.biometrics = res.body;
                    this.fingers = this.fingers.filter(f => !this.biometrics.map(b => b.templateType).includes(f))
                }
            })
        });

        this.biometricService.getReaders().subscribe(res => this.readers = res);
    }

    enroll() {
        const dialogRef = this._dialogService.openAlert({
            message: `Please put your ${this.finger.toString()} on the scanner.`,
            title: 'Enroll finger',
            disableClose: true
        });
        this.biometricService.identify(this.reader.id).subscribe(res => {
            dialogRef.close();
            if (res.message === 'PATIENT_NOT_IDENTIFIED') {
                const biometric: Biometric = {
                    date: moment(),
                    facility: this.patient.facility,
                    patient: this.patient,
                    template: res.template,
                    templateType: this.finger,
                    biometricType: 'FINGERPRINT'
                };

                this.biometrics = this.biometrics.filter(b => b.templateType !== this.finger);
                this.biometrics.push(biometric);

                this._dialogService.openAlert({
                    message: `Finger ${this.finger.toString()} successfully enrolled.`,
                    title: 'Enrollment success'
                });
                this.message = 'Please remember to click \'Save Enrollment\' when through enrolling all fingers';
            } else if (res.message === 'PATIENT_IDENTIFIED') {
                const fingerId = res.id;
                this.biometricService.getBiometric(fingerId).subscribe(res => {
                    this._dialogService.openAlert({
                        message: `Finger already enrolled by patient ${res.patient.surname}, ${res.patient.otherNames} (${res.patient.hospitalNum})`,
                        title: 'Enrollment error'
                    })
                })
            } else {
                this._dialogService.openAlert({
                    message: 'There was an error enrolling finger, please try again',
                    title: 'Enrollment error'
                })
            }
        });
    }

    fingerToString(finger: Finger) {
        const fingers = {
            RIGHT_INDEX_FINGER: 'Right Index Finger',
            LEFT_INDEX_FINGER: 'Left Index Finger',
            RIGHT_THUMB: 'Right Thumb',
            LEFT_THUMB: 'Left Thumb',
            RIGHT_MIDDLE_FINGER: 'Right Middle Finger',
            LEFT_MIDDLE_FINGER: 'Left Middle Finger'
        };
        return fingers[finger]
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        this.subscribeToSaveResponse(this.biometricService.saveTemplates(this.biometrics));
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
        this.notification.showInfo('Fingerprints successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving enrolling fingerprints');
    }

    protected onError(errorMessage: string) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
}

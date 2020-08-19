import { Component, Input, OnInit } from '@angular/core';
import { PatientService, PatientTimeline } from '../services/patient.service';
import { Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { NotificationService } from '@alfresco/adf-core';
import { ObservationService } from '../services/observation.service';

@Component({
    selector: 'patient-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
    @Input()
    patientId: number;
    @Input()
    patientUuid: string;
    @Input()
    detailed: boolean = false;
    timeLine: PatientTimeline[];

    constructor(private patientService: PatientService, private router: Router, private observationService: ObservationService,
                private _dialogService: TdDialogService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loadActivities()
    }

    view(path: string, id: string) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'view'])
    }

    edit(path: string, id: string) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'edit'])
    }

    delete(path: string, id: string) {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this event, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.observationService.getObservation(path, id).subscribe(obj => {
                    if (obj.body) {
                        this.observationService.deleteObservation(path, obj.body.id).subscribe((res) => {
                            if (res.ok) {
                                this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res)
                            } else {
                                this.notificationService.showError('Error deleting event, please try again')
                            }
                        })
                    }
                })
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    loadActivities() {
        this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res)
    }
}

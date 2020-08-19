import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { NotificationService } from '@alfresco/adf-core';

@Component({
    selector: 'alert',
    template: ``
})
export class AlertComponent implements OnInit, OnDestroy {
    alerts: any[];

    constructor(private notification: NotificationService, private alertService: JhiAlertService) {}

    ngOnInit() {
        this.alerts = this.alertService.get();
        this.alerts.forEach(alert => this.notification.openSnackMessage(alert.msg, 5000));
    }

    ngOnDestroy() {
        this.alerts = [];
    }
}

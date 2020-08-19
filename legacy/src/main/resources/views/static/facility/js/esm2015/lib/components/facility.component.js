import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { NotificationService } from '@alfresco/adf-core';
import { entityCompare } from '@lamis/web-core';
let FacilityComponent = class FacilityComponent {
    constructor(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }
    ngOnInit() {
        this.facilityService.getStates().subscribe(res => this.states = res);
        this.facility = this.facilityService.getActive().subscribe(res => {
            if (res.body) {
                this.facility = res.body;
            }
        });
    }
    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }
    stateChanged(id) {
        this.facilityService.getLgaByState(id).subscribe(res => this.lgas = res);
    }
    lgaChanged(id) {
        this.facilityService.getFacilitiesByLga(id).subscribe(res => this.facilities = res);
    }
    setActive() {
        this.facilityService.update(this.active).subscribe(res => {
            if (res.ok && res.body) {
                this.facilityService.getActive().subscribe(r => {
                    if (r.body) {
                        this.facility = r.body;
                    }
                });
                this.notification.showInfo(`Facility switched to ${res.body.name}`);
            }
        });
    }
};
FacilityComponent.ctorParameters = () => [
    { type: FacilityService },
    { type: NotificationService }
];
FacilityComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-facility',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n                Switch Facility\r\n            </mat-card-header>\r\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\r\n                <mat-card-content>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            Active Facility: {{facility.name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"State\"\r\n                                            (selectionChange)=\"stateChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let state of states\"\r\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"LGA\"\r\n                                            (selectionChange)=\"lgaChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let lga of lgas\"\r\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"Facility\"\r\n                                            [(ngModel)]=\"active\"\r\n                                            required\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #fac=\"ngModel\"\r\n                                            name=\"facility\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let facility of facilities\"\r\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error *ngIf=\"fac.errors\">\r\n                                    Facility is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\r\n                </mat-card-actions>\r\n            </form>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n",
        styles: [".bold{font-weight:700}"]
    }),
    tslib_1.__metadata("design:paramtypes", [FacilityService, NotificationService])
], FacilityComponent);
export { FacilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQVExQixZQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBRTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFFO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUE7cUJBQ3pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHdCQUF3QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7YUFDdEU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFBOztZQXBDd0MsZUFBZTtZQUF3QixtQkFBbUI7O0FBUnRGLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLHd4R0FBd0M7O0tBRTNDLENBQUM7NkNBU3VDLGVBQWUsRUFBd0IsbUJBQW1CO0dBUnRGLGlCQUFpQixDQTRDN0I7U0E1Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmFjaWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmFjaWxpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBlbnRpdHlDb21wYXJlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xhbWlzLWZhY2lsaXR5JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNpbGl0eS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNpbGl0eS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGYWNpbGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBzdGF0ZXM6IGFueVtdO1xyXG4gICAgbGdhczogYW55W107XHJcbiAgICBmYWNpbGl0aWVzOiBhbnlbXTtcclxuICAgIGFjdGl2ZTogYW55O1xyXG5cclxuICAgIGZhY2lsaXR5OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmYWNpbGl0eVNlcnZpY2U6IEZhY2lsaXR5U2VydmljZSwgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRTdGF0ZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3RhdGVzID0gcmVzKTtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5ID0gdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcy5ib2R5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGVudGl0eUNvbXBhcmUoZTEsIGUyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVudGl0eUNvbXBhcmUoZTEsIGUyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZUNoYW5nZWQoaWQpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRMZ2FCeVN0YXRlKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMubGdhcyA9IHJlcylcclxuICAgIH1cclxuXHJcbiAgICBsZ2FDaGFuZ2VkKGlkKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0RmFjaWxpdGllc0J5TGdhKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdGllcyA9IHJlcylcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UudXBkYXRlKHRoaXMuYWN0aXZlKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5vayAmJiByZXMuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHIuYm9keVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0luZm8oYEZhY2lsaXR5IHN3aXRjaGVkIHRvICR7cmVzLmJvZHkubmFtZX1gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
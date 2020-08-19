import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { NotificationService } from '@alfresco/adf-core';
import { entityCompare } from '@lamis/web-core';
var FacilityComponent = /** @class */ (function () {
    function FacilityComponent(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }
    FacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getStates().subscribe(function (res) { return _this.states = res; });
        this.facility = this.facilityService.getActive().subscribe(function (res) {
            if (res.body) {
                _this.facility = res.body;
            }
        });
    };
    FacilityComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    FacilityComponent.prototype.stateChanged = function (id) {
        var _this = this;
        this.facilityService.getLgaByState(id).subscribe(function (res) { return _this.lgas = res; });
    };
    FacilityComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.facilityService.getFacilitiesByLga(id).subscribe(function (res) { return _this.facilities = res; });
    };
    FacilityComponent.prototype.setActive = function () {
        var _this = this;
        this.facilityService.update(this.active).subscribe(function (res) {
            if (res.ok && res.body) {
                _this.facilityService.getActive().subscribe(function (r) {
                    if (r.body) {
                        _this.facility = r.body;
                    }
                });
                _this.notification.showInfo("Facility switched to " + res.body.name);
            }
        });
    };
    FacilityComponent.ctorParameters = function () { return [
        { type: FacilityService },
        { type: NotificationService }
    ]; };
    FacilityComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-facility',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n                Switch Facility\r\n            </mat-card-header>\r\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\r\n                <mat-card-content>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            Active Facility: {{facility.name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"State\"\r\n                                            (selectionChange)=\"stateChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let state of states\"\r\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"LGA\"\r\n                                            (selectionChange)=\"lgaChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let lga of lgas\"\r\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"Facility\"\r\n                                            [(ngModel)]=\"active\"\r\n                                            required\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #fac=\"ngModel\"\r\n                                            name=\"facility\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let facility of facilities\"\r\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error *ngIf=\"fac.errors\">\r\n                                    Facility is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\r\n                </mat-card-actions>\r\n            </form>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n",
            styles: [".bold{font-weight:700}"]
        }),
        tslib_1.__metadata("design:paramtypes", [FacilityService, NotificationService])
    ], FacilityComponent);
    return FacilityComponent;
}());
export { FacilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRDtJQVFJLDJCQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzFELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsRUFBRTtRQUFmLGlCQUVDO1FBREcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQWYsQ0FBZSxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxFQUFFO1FBQWIsaUJBRUM7UUFERyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFyQixDQUFxQixDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2xELElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDUixLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUE7cUJBQ3pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLDBCQUF3QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFBO2FBQ3RFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFuQ29DLGVBQWU7Z0JBQXdCLG1CQUFtQjs7SUFSdEYsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsd3hHQUF3Qzs7U0FFM0MsQ0FBQztpREFTdUMsZUFBZSxFQUF3QixtQkFBbUI7T0FSdEYsaUJBQWlCLENBNEM3QjtJQUFELHdCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0E1Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmFjaWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmFjaWxpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBlbnRpdHlDb21wYXJlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xhbWlzLWZhY2lsaXR5JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNpbGl0eS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNpbGl0eS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGYWNpbGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBzdGF0ZXM6IGFueVtdO1xyXG4gICAgbGdhczogYW55W107XHJcbiAgICBmYWNpbGl0aWVzOiBhbnlbXTtcclxuICAgIGFjdGl2ZTogYW55O1xyXG5cclxuICAgIGZhY2lsaXR5OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmYWNpbGl0eVNlcnZpY2U6IEZhY2lsaXR5U2VydmljZSwgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRTdGF0ZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3RhdGVzID0gcmVzKTtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5ID0gdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcy5ib2R5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGVudGl0eUNvbXBhcmUoZTEsIGUyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVudGl0eUNvbXBhcmUoZTEsIGUyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZUNoYW5nZWQoaWQpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRMZ2FCeVN0YXRlKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMubGdhcyA9IHJlcylcclxuICAgIH1cclxuXHJcbiAgICBsZ2FDaGFuZ2VkKGlkKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0RmFjaWxpdGllc0J5TGdhKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdGllcyA9IHJlcylcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UudXBkYXRlKHRoaXMuYWN0aXZlKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5vayAmJiByZXMuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHIuYm9keVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0luZm8oYEZhY2lsaXR5IHN3aXRjaGVkIHRvICR7cmVzLmJvZHkubmFtZX1gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
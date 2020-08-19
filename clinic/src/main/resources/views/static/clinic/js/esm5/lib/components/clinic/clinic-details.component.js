import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { TdDialogService } from '@covalent/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewFloatItemModel, CardViewIntItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import * as moment_ from 'moment';
var moment = moment_;
var ClinicDetailsComponent = /** @class */ (function () {
    function ClinicDetailsComponent(router, route, clinicService, cfr, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.clinicService = clinicService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    ClinicDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get("patientId");
            _this.clinicService.getPatient(patientId).subscribe(function (res) { return _this.entity.patient = res; });
            _this.buildProperties();
        });
    };
    ClinicDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'clinics', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    ClinicDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this clinic visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.clinicService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    ClinicDetailsComponent.prototype.buildProperties = function () {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: this.entity.commence ? 'ART Start Date' : 'Date Visit',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.commence) {
            this.properties.push(new CardViewIntItemModel({
                label: 'CD4 at start of ART',
                key: 'cd4',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewFloatItemModel({
                label: 'CD4%',
                key: 'cd4p',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen Line',
                key: 'rl',
                value: this.entity.regimenType != null ? this.entity.regimenType.description : ''
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen',
                key: 'rl',
                value: this.entity.regimen != null ? this.entity.regimen.description : ''
            }));
        }
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.enrolledOnOTZ) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment(this.entity.extra.dateEnrolledOnOTZ),
                label: 'Date Enrolled on OTZ',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Clinical Stage',
            key: 'cs',
            value: this.entity.clinicStage
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Functional Status',
            key: 'fs',
            value: this.entity.funcStatus
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'TB Status',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Body Weight(Kg)',
            key: 'bw',
            value: this.entity.bodyWeight || null
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Height(m)',
            key: 'h',
            value: this.entity.height || null
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Blood Pressure',
            key: 'cd4p',
            value: this.entity.bp
        }));
        if (this.entity.patient.gender === 'Female') {
            this.properties.push(new CardViewBoolItemModel({
                label: 'Pregnant',
                key: 'pg',
                value: this.entity.pregnant
            }));
            this.properties.push(new CardViewBoolItemModel({
                label: 'Breastfeeding',
                key: 'bf',
                value: this.entity.breastfeeding
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'lpm',
                value: this.entity.lmp,
                label: 'LMP',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Level of Adherence',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.dateLastOTZMeeting) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment(this.entity.extra.dateLastOTZMeeting),
                label: 'Date of Last OTZ Meeting',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Appointment Date',
            format: 'dd MMM, yyyy'
        }));
    };
    ClinicDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    ClinicDetailsComponent.prototype.ngOnDestroy = function () {
    };
    ClinicDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: ClinicService },
        { type: ComponentFactoryResolver },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    ClinicDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-clinic',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, ClinicService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService])
    ], ClinicDetailsComponent);
    return ClinicDetailsComponent;
}());
export { ClinicDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2xpbmljL2NsaW5pYy1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBSUksZ0NBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLGFBQTRCLEVBQ25GLEdBQTZCLEVBQVUsY0FBK0IsRUFDdEUsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ25GLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFMNUQsZUFBVSxHQUFtQixFQUFFLENBQUM7SUFNaEMsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FB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RixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsMEJBQTBCO2dCQUNqQyxNQUFNLEVBQUUsY0FBYzthQUN6QixDQUFDLENBQUMsQ0FBQztTQUNQO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7WUFDbEMsS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixNQUFNLEVBQUUsY0FBYztTQUN6QixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCw4Q0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sNENBQVcsR0FBbEI7SUFDQSxDQUFDOztnQkF2SjJCLE1BQU07Z0JBQWlCLGNBQWM7Z0JBQXlCLGFBQWE7Z0JBQzlFLHdCQUF3QjtnQkFBMEIsZUFBZTtnQkFDakQsbUJBQW1COztJQU5uRCxzQkFBc0I7UUFKbEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsdXdCQUE4QztTQUNqRCxDQUFDO2lEQUs4QixNQUFNLEVBQWlCLGNBQWMsRUFBeUIsYUFBYTtZQUM5RSx3QkFBd0IsRUFBMEIsZUFBZTtZQUNqRCxtQkFBbUI7T0FObkQsc0JBQXNCLENBNEpsQztJQUFELDZCQUFDO0NBQUEsQUE1SkQsSUE0SkM7U0E1Slksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsaW5pYyB9IGZyb20gJy4uLy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGluaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2xpbmljLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0RhdGVJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsLFxyXG4gICAgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0l0ZW0sXHJcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlXHJcbn0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFtaXMtY2xpbmljJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9jbGluaWMtZGV0YWlscy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENsaW5pY0RldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xyXG4gICAgZW50aXR5OiBDbGluaWM7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgY2xpbmljU2VydmljZTogQ2xpbmljU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gISFlbnRpdHkgJiYgZW50aXR5LmJvZHkgPyBlbnRpdHkuYm9keSA6IGVudGl0eTtcclxuICAgICAgICAgICAgY29uc3QgcGF0aWVudElkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoXCJwYXRpZW50SWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpbmljU2VydmljZS5nZXRQYXRpZW50KHBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuZW50aXR5LnBhdGllbnQgPSByZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkUHJvcGVydGllcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2NsaW5pY3MnLCB0aGlzLmVudGl0eS51dWlkLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnBhdGllbnQudXVpZCwgJ2VkaXQnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2xpbmljIHZpc2l0LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcclxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXHJcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaW5pY1NlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydwYXRpZW50cyddKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHZpc2l0LCBwbGVhc2UgdHJ5IGFnYWluJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcclxuICAgICAgICAgICAga2V5OiAnZHMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZVZpc2l0LFxyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5lbnRpdHkuY29tbWVuY2UgPyAnQVJUIFN0YXJ0IERhdGUnIDogJ0RhdGUgVmlzaXQnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5jb21tZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDRDQgYXQgc3RhcnQgb2YgQVJUJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ2NkNCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuY2Q0cCB8fCBudWxsXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RmxvYXRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDRDQlJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ2NkNHAnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmNkNHAgfHwgbnVsbFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdPcmlnaW5hbCBSZWdpbWVuIExpbmUnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAncmwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnJlZ2ltZW5UeXBlICE9IG51bGwgPyB0aGlzLmVudGl0eS5yZWdpbWVuVHlwZS5kZXNjcmlwdGlvbiA6ICcnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ09yaWdpbmFsIFJlZ2ltZW4nLFxyXG4gICAgICAgICAgICAgICAga2V5OiAncmwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnJlZ2ltZW4gIT0gbnVsbCA/IHRoaXMuZW50aXR5LnJlZ2ltZW4uZGVzY3JpcHRpb24gOiAnJ1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5leHRyYSAmJiB0aGlzLmVudGl0eS5leHRyYS5vdHogJiYgdGhpcy5lbnRpdHkuZXh0cmEub3R6LmVucm9sbGVkT25PVFopIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICdkcycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KHRoaXMuZW50aXR5LmV4dHJhLmRhdGVFbnJvbGxlZE9uT1RaKSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBFbnJvbGxlZCBvbiBPVFonLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBsYWJlbDogJ0NsaW5pY2FsIFN0YWdlJyxcclxuICAgICAgICAgICAga2V5OiAnY3MnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuY2xpbmljU3RhZ2VcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnRnVuY3Rpb25hbCBTdGF0dXMnLFxyXG4gICAgICAgICAgICBrZXk6ICdmcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5mdW5jU3RhdHVzXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBsYWJlbDogJ1RCIFN0YXR1cycsXHJcbiAgICAgICAgICAgIGtleTogJ3RzJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnRiU3RhdHVzXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdCb2R5IFdlaWdodChLZyknLFxyXG4gICAgICAgICAgICBrZXk6ICdidycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5ib2R5V2VpZ2h0IHx8IG51bGxcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RmxvYXRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBsYWJlbDogJ0hlaWdodChtKScsXHJcbiAgICAgICAgICAgIGtleTogJ2gnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuaGVpZ2h0IHx8IG51bGxcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnQmxvb2QgUHJlc3N1cmUnLFxyXG4gICAgICAgICAgICBrZXk6ICdjZDRwJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmJwXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5wYXRpZW50LmdlbmRlciA9PT0gJ0ZlbWFsZScpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1ByZWduYW50JyxcclxuICAgICAgICAgICAgICAgIGtleTogJ3BnJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5wcmVnbmFudFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdCcmVhc3RmZWVkaW5nJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ2JmJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5icmVhc3RmZWVkaW5nXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICdscG0nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmxtcCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTE1QJyxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdMZXZlbCBvZiBBZGhlcmVuY2UnLFxyXG4gICAgICAgICAgICBrZXk6ICd0cycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS50YlN0YXR1c1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZXh0cmEgJiYgdGhpcy5lbnRpdHkuZXh0cmEub3R6ICYmIHRoaXMuZW50aXR5LmV4dHJhLm90ei5kYXRlTGFzdE9UWk1lZXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6ICdkcycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KHRoaXMuZW50aXR5LmV4dHJhLmRhdGVMYXN0T1RaTWVldGluZyksXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgTGFzdCBPVFogTWVldGluZycsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGtleTogJ25hJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5Lm5leHRBcHBvaW50bWVudCxcclxuICAgICAgICAgICAgbGFiZWw6ICdOZXh0IEFwcG9pbnRtZW50IERhdGUnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzU3RhdGUoKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgIH1cclxufVxyXG4iXX0=
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CaseManagerService } from '../../services/case-manager.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagementService } from '../../services/case-management.service';
var CaseManagerListComponent = /** @class */ (function () {
    function CaseManagerListComponent(caseManagerService, caseManagementService, notification, router, activatedRoute) {
        this.caseManagerService = caseManagerService;
        this.caseManagementService = caseManagementService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 200;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
    }
    CaseManagerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.caseManagementService.getActiveFacility().subscribe(function (res) {
            _this.facility = res;
            _this.onPageChange(0);
        });
    };
    CaseManagerListComponent.prototype.select = function (data) {
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
    };
    CaseManagerListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadAll = function () {
        var _this = this;
        this.loading = true;
        this.caseManagerService.query({
            keyword: this.currentSearch,
            page: this.page,
            id: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) { return _this.onError(res); });
    };
    CaseManagerListComponent.prototype.onSuccess = function (data, headers) {
        this.caseManagers = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    CaseManagerListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    CaseManagerListComponent.ctorParameters = function () { return [
        { type: CaseManagerService },
        { type: CaseManagementService },
        { type: NotificationService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    CaseManagerListComponent = tslib_1.__decorate([
        Component({
            selector: 'case-managers',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"caseManagers\"\n                       [rows]=\"caseManagers\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"phoneNumber\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!caseManagers\"\n            icon=\"blur_on\"\n            [title]=\"'No Case Managers found'\"\n            [subtitle]=\"'No Case Managers matching search criteria or no Case Managers available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Case Manager'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [CaseManagerService,
            CaseManagementService,
            NotificationService,
            Router,
            ActivatedRoute])
    ], CaseManagerListComponent);
    return CaseManagerListComponent;
}());
export { CaseManagerListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBTy9FO0lBVUksa0NBQW9CLGtCQUFzQyxFQUN0QyxxQkFBNEMsRUFDMUMsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSmhDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWJwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO0lBUWpCLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3hELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0seUNBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCwrQ0FBWSxHQUFaLFVBQWEsUUFBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDJDQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsMENBQU8sR0FBUDtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ3ZCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDdEIsQ0FBQyxDQUFDLFNBQVMsQ0FDUixVQUFDLEdBQVE7WUFDTCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pDLENBQUMsRUFDRCxVQUFDLEdBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQ2xDLENBQUM7SUFDTixDQUFDO0lBRVMsNENBQVMsR0FBbkIsVUFBb0IsSUFBUyxFQUFFLE9BQVk7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTywwQ0FBTyxHQUFmLFVBQWdCLEtBQVU7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Z0JBckR1QyxrQkFBa0I7Z0JBQ2YscUJBQXFCO2dCQUM1QixtQkFBbUI7Z0JBQ3pCLE1BQU07Z0JBQ0UsY0FBYzs7SUFkM0Msd0JBQXdCO1FBSnBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLG96RUFBaUQ7U0FDcEQsQ0FBQztpREFXMEMsa0JBQWtCO1lBQ2YscUJBQXFCO1lBQzVCLG1CQUFtQjtZQUN6QixNQUFNO1lBQ0UsY0FBYztPQWQzQyx3QkFBd0IsQ0FnRXBDO0lBQUQsK0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FzZS1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENhc2VNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSAnLi4vLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Nhc2UtbWFuYWdlcnMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXNlLW1hbmFnZXIubGlzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwYWdlID0gMDtcbiAgICBjYXNlTWFuYWdlcnM6IENhc2VNYW5hZ2VyW107XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHB1YmxpYyBpdGVtc1BlclBhZ2U6IG51bWJlciA9IDIwMDtcbiAgICBwdWJsaWMgY3VycmVudFNlYXJjaDogc3RyaW5nID0gJyc7XG4gICAgdG90YWxJdGVtcyA9IDA7XG4gICAgZGlzcGxheSA9ICdsaXN0JztcbiAgICBmYWNpbGl0eTogRmFjaWxpdHk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhc2VNYW5hZ2VyU2VydmljZTogQ2FzZU1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FzZU1hbmFnZW1lbnRTZXJ2aWNlOiBDYXNlTWFuYWdlbWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNhc2VNYW5hZ2VtZW50U2VydmljZS5nZXRBY3RpdmVGYWNpbGl0eSgpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlKDApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3QoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdjYXNlLW1hbmFnZXJzJywgZGF0YS5vYmoudXVpZCwgJ3ZpZXcnXSwge3JlbGF0aXZlVG86IHRoaXMuYWN0aXZhdGVkUm91dGV9KTtcbiAgICB9XG5cbiAgICBvblBhZ2VDaGFuZ2UocGFnZUluZm8pIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZUluZm87XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhc2VNYW5hZ2VyU2VydmljZS5xdWVyeSh7XG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmN1cnJlbnRTZWFyY2gsXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICBpZDogdGhpcy5mYWNpbGl0eS5pZCB8fCAwLFxuICAgICAgICAgICAgc2l6ZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBzb3J0OiBbJ2lkJywgJ2FzYyddXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKHJlcy5ib2R5LCByZXMuaGVhZGVycylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHRoaXMub25FcnJvcihyZXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcyhkYXRhOiBhbnksIGhlYWRlcnM6IGFueSkge1xuICAgICAgICB0aGlzLmNhc2VNYW5hZ2VycyA9IGRhdGE7XG4gICAgICAgIHRoaXMudG90YWxJdGVtcyA9IGhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50Jyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLm9wZW5TbmFja01lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==
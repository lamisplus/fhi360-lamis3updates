import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CaseManagerService } from '../../services/case-manager.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagementService } from '../../services/case-management.service';
let CaseManagerListComponent = class CaseManagerListComponent {
    constructor(caseManagerService, caseManagementService, notification, router, activatedRoute) {
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
    ngOnInit() {
        this.caseManagementService.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.onPageChange(0);
        });
    }
    select(data) {
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
    }
    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    }
    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    loadAll() {
        this.loading = true;
        this.caseManagerService.query({
            keyword: this.currentSearch,
            page: this.page,
            id: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe((res) => {
            this.onSuccess(res.body, res.headers);
        }, (res) => this.onError(res));
    }
    onSuccess(data, headers) {
        this.caseManagers = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }
    onError(error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
};
CaseManagerListComponent.ctorParameters = () => [
    { type: CaseManagerService },
    { type: CaseManagementService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];
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
export { CaseManagerListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBTy9FLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBVWpDLFlBQW9CLGtCQUFzQyxFQUN0QyxxQkFBNEMsRUFDMUMsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSmhDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWJwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO0lBUWpCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN2QixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQ1IsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsQ0FBQyxFQUNELENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNsQyxDQUFDO0lBQ04sQ0FBQztJQUVTLFNBQVMsQ0FBQyxJQUFTLEVBQUUsT0FBWTtRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVPLE9BQU8sQ0FBQyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Q0FDSixDQUFBOztZQXREMkMsa0JBQWtCO1lBQ2YscUJBQXFCO1lBQzVCLG1CQUFtQjtZQUN6QixNQUFNO1lBQ0UsY0FBYzs7QUFkM0Msd0JBQXdCO0lBSnBDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLG96RUFBaUQ7S0FDcEQsQ0FBQzs2Q0FXMEMsa0JBQWtCO1FBQ2YscUJBQXFCO1FBQzVCLG1CQUFtQjtRQUN6QixNQUFNO1FBQ0UsY0FBYztHQWQzQyx3QkFBd0IsQ0FnRXBDO1NBaEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlciB9IGZyb20gJy4uLy4uL21vZGVsL2Nhc2UtbWFuYWdlbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tICcuLi8uLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FzZS1tYW5hZ2VycycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHBhZ2UgPSAwO1xuICAgIGNhc2VNYW5hZ2VyczogQ2FzZU1hbmFnZXJbXTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMjAwO1xuICAgIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBkaXNwbGF5ID0gJ2xpc3QnO1xuICAgIGZhY2lsaXR5OiBGYWNpbGl0eTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FzZU1hbmFnZXJTZXJ2aWNlOiBDYXNlTWFuYWdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYXNlTWFuYWdlbWVudFNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZW1lbnRTZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UoMCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdChkYXRhOiBhbnkpOiBhbnkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uJywgJ2Nhc2UtbWFuYWdlcnMnLCBkYXRhLm9iai51dWlkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZX0pO1xuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZShwYWdlSW5mbykge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlSW5mbztcbiAgICAgICAgdGhpcy5sb2FkQWxsKCk7XG4gICAgfVxuXG4gICAgbG9hZFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIGxvYWRBbGwoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZXJTZXJ2aWNlLnF1ZXJ5KHtcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMuY3VycmVudFNlYXJjaCxcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgICAgIGlkOiB0aGlzLmZhY2lsaXR5LmlkIHx8IDAsXG4gICAgICAgICAgICBzaXplOiB0aGlzLml0ZW1zUGVyUGFnZSxcbiAgICAgICAgICAgIHNvcnQ6IFsnaWQnLCAnYXNjJ11cbiAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MocmVzLmJvZHksIHJlcy5oZWFkZXJzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4gdGhpcy5vbkVycm9yKHJlcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKGRhdGE6IGFueSwgaGVhZGVyczogYW55KSB7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZXJzID0gZGF0YTtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIl19
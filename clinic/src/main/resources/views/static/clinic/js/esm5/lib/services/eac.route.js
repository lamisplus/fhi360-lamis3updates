import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EacService } from './eac.service';
import { EacEditComponent } from '../components/eac/eac.edit.component';
import { EacDetailsComponent } from '../components/eac/eac.details.component';
var EacResolve = /** @class */ (function () {
    function EacResolve(service) {
        this.service = service;
    }
    EacResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) { return response.ok; }), map(function (patient) { return patient.body; }));
        }
        return of({});
    };
    EacResolve.ctorParameters = function () { return [
        { type: EacService }
    ]; };
    EacResolve = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [EacService])
    ], EacResolve);
    return EacResolve;
}());
export { EacResolve };
var ɵ0 = {
    title: 'EAC Session',
    breadcrumb: 'EAC SESSION'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'EAC Session',
    breadcrumb: 'EAC SESSION'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'EAC Session',
    breadcrumb: 'ADD EAC SESSION',
    commence: true
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'EAC Session Edit',
    breadcrumb: 'EAC SESSION EDIT'
};
export var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: EacDetailsComponent,
                resolve: {
                    entity: EacResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: EacEditComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: EacEditComponent,
                resolve: {
                    entity: EacResolve
                },
                data: ɵ3,
            }
        ]
    }
];
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLnJvdXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2VhYy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUc5RTtJQUNJLG9CQUFvQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQ3ZDLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsS0FBNkIsRUFBRSxLQUEwQjtRQUM3RCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxFQUFFLEVBQUU7WUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbkMsTUFBTSxDQUFDLFVBQUMsUUFBMkIsSUFBSyxPQUFBLFFBQVEsQ0FBQyxFQUFFLEVBQVgsQ0FBVyxDQUFDLEVBQ3BELEdBQUcsQ0FBQyxVQUFDLE9BQTBCLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxFQUFaLENBQVksQ0FBQyxDQUNwRCxDQUFDO1NBQ0w7UUFDRCxPQUFPLEVBQUUsQ0FBTSxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDOztnQkFaNEIsVUFBVTs7SUFEOUIsVUFBVTtRQUR0QixVQUFVLEVBQUU7aURBRW9CLFVBQVU7T0FEOUIsVUFBVSxDQWN0QjtJQUFELGlCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksVUFBVTtTQW1CVDtJQUNGLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFVBQVUsRUFBRSxhQUFhO0NBQzVCLE9BUWE7SUFDRixXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDMUIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsVUFBVSxFQUFFLGFBQWE7Q0FDNUIsT0FNSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsYUFBYTtJQUNwQixVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFFBQVEsRUFBRSxJQUFJO0NBQ2pCLE9BU0s7SUFDRixXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDekIsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixVQUFVLEVBQUUsa0JBQWtCO0NBQ2pDO0FBMUNqQixNQUFNLENBQUMsSUFBTSxNQUFNLEdBQVc7SUFDMUI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksSUFHSDtRQUNELFFBQVEsRUFBRTtZQUNOO2dCQUNJLElBQUksRUFBRSw2QkFBNkI7Z0JBQ25DLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsVUFBVTtpQkFDckI7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7WUFDRDtnQkFDSSxJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixTQUFTLEVBQUUsZ0JBQWdCO2dCQUMzQixJQUFJLElBS0g7YUFFSjtZQUNEO2dCQUNJLElBQUksRUFBRSw2QkFBNkI7Z0JBQ25DLFNBQVMsRUFBRSxnQkFBZ0I7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsVUFBVTtpQkFDckI7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJlc29sdmUsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFQUMgfSBmcm9tICcuLi9tb2RlbC9jbGluaWMubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRWFjU2VydmljZSB9IGZyb20gJy4vZWFjLnNlcnZpY2UnO1xuaW1wb3J0IHsgRWFjRWRpdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZWFjL2VhYy5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFYWNEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9lYWMvZWFjLmRldGFpbHMuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVhY1Jlc29sdmUgaW1wbGVtZW50cyBSZXNvbHZlPEVBQz4ge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRWFjU2VydmljZSkge1xuICAgIH1cblxuICAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxFQUM+IHtcbiAgICAgICAgY29uc3QgaWQgPSByb3V0ZS5wYXJhbXNbJ2lkJ10gPyByb3V0ZS5wYXJhbXNbJ2lkJ10gOiBudWxsO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZmluZEJ5VXVpZChpZCkucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8RUFDPikgPT4gcmVzcG9uc2Uub2spLFxuICAgICAgICAgICAgICAgIG1hcCgocGF0aWVudDogSHR0cFJlc3BvbnNlPEVBQz4pID0+IHBhdGllbnQuYm9keSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKDxFQUM+e30pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJPVVRFUzogUm91dGVzID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRpdGxlOiAnRUFDIFNlc3Npb24nLFxuICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0VBQyBTRVNTSU9OJ1xuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvcGF0aWVudC86cGF0aWVudElkL3ZpZXcnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogRWFjRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogRWFjUmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX1VTRVInXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFQUMgU2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdFQUMgU0VTU0lPTidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAncGF0aWVudC86cGF0aWVudElkL25ldycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBFYWNFZGl0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9ERUMnXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFQUMgU2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdBREQgRUFDIFNFU1NJT04nLFxuICAgICAgICAgICAgICAgICAgICBjb21tZW5jZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvcGF0aWVudC86cGF0aWVudElkL2VkaXQnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogRWFjRWRpdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogRWFjUmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0VBQyBTZXNzaW9uIEVkaXQnLFxuICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iOiAnRUFDIFNFU1NJT04gRURJVCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXTtcbiJdfQ==
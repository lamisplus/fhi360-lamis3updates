import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DevolveEditComponent } from '../components/devolve.edit.component';
import { DevolveDetailsComponent } from '../components/devolve.details.component';
import { DevolveService } from './devolve.service';
import { EndDevolveComponent } from '../components/end.devolve.component';
var DevolveResolve = /** @class */ (function () {
    function DevolveResolve(service) {
        this.service = service;
    }
    DevolveResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) { return response.ok; }), map(function (patient) { return patient.body; }));
        }
        return of({});
    };
    DevolveResolve.ctorParameters = function () { return [
        { type: DevolveService }
    ]; };
    DevolveResolve = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [DevolveService])
    ], DevolveResolve);
    return DevolveResolve;
}());
export { DevolveResolve };
var ɵ0 = {
    title: 'Client Devolvement',
    breadcrumb: 'CLIENT DEVOLVEMENT'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Client Devolve',
    breadcrumb: 'CLIENT DEVOLVE'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'Client Devolve',
    breadcrumb: 'DEVOLVE CLIENT'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Devolve Edit',
    breadcrumb: 'DEVOLVE EDIT'
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'End Devolve',
    breadcrumb: 'END CLIENT DEVOLVE'
};
export var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: DevolveDetailsComponent,
                resolve: {
                    entity: DevolveResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: DevolveEditComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: DevolveEditComponent,
                resolve: {
                    entity: DevolveResolve
                },
                data: ɵ3,
            },
            {
                path: 'return/patient/:patientId/new',
                component: EndDevolveComponent,
                data: ɵ4,
            }
        ]
    }
];
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBoYXJtYWN5LTEuMS40LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Rldm9sdmUucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUcxRTtJQUNJLHdCQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUMzQyxDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLEtBQTZCLEVBQUUsS0FBMEI7UUFDN0QsSUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFELElBQUksRUFBRSxFQUFFO1lBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ25DLE1BQU0sQ0FBQyxVQUFDLFFBQStCLElBQUssT0FBQSxRQUFRLENBQUMsRUFBRSxFQUFYLENBQVcsQ0FBQyxFQUN4RCxHQUFHLENBQUMsVUFBQyxPQUE4QixJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksRUFBWixDQUFZLENBQUMsQ0FDeEQsQ0FBQztTQUNMO1FBQ0QsT0FBTyxFQUFFLENBQVUsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBWjRCLGNBQWM7O0lBRGxDLGNBQWM7UUFEMUIsVUFBVSxFQUFFO2lEQUVvQixjQUFjO09BRGxDLGNBQWMsQ0FjMUI7SUFBRCxxQkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLGNBQWM7U0FtQmI7SUFDRixLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFVBQVUsRUFBRSxvQkFBb0I7Q0FDbkMsT0FRYTtJQUNGLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFVBQVUsRUFBRSxnQkFBZ0I7Q0FDL0IsT0FNSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFVBQVUsRUFBRSxnQkFBZ0I7Q0FDL0IsT0FTSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixVQUFVLEVBQUUsY0FBYztDQUM3QixPQU1LO0lBQ0YsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDO0lBQ3pCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFVBQVUsRUFBRSxvQkFBb0I7Q0FDbkM7QUFuRGpCLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBVztJQUMxQjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxJQUdIO1FBQ0QsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsU0FBUyxFQUFFLHVCQUF1QjtnQkFDbEMsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxjQUFjO2lCQUN6QjtnQkFDRCxJQUFJLElBSUg7YUFFSjtZQUNEO2dCQUNJLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLFNBQVMsRUFBRSxvQkFBb0I7Z0JBQy9CLElBQUksSUFJSDthQUVKO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxjQUFjO2lCQUN6QjtnQkFDRCxJQUFJLElBSUg7YUFFSjtZQUNEO2dCQUNJLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksSUFJSDthQUVKO1NBQ0o7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSZXNvbHZlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGV2b2x2ZSB9IGZyb20gJy4uL21vZGVsL3BoYXJtYWN5Lm1vZGVsJztcbmltcG9ydCB7IERldm9sdmVFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9kZXZvbHZlLmVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IERldm9sdmVEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9kZXZvbHZlLmRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IERldm9sdmVTZXJ2aWNlIH0gZnJvbSAnLi9kZXZvbHZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRW5kRGV2b2x2ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZW5kLmRldm9sdmUuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERldm9sdmVSZXNvbHZlIGltcGxlbWVudHMgUmVzb2x2ZTxEZXZvbHZlPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZXZvbHZlU2VydmljZSkge1xuICAgIH1cblxuICAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxEZXZvbHZlPiB7XG4gICAgICAgIGNvbnN0IGlkID0gcm91dGUucGFyYW1zWydpZCddID8gcm91dGUucGFyYW1zWydpZCddIDogbnVsbDtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmRCeVV1aWQoaWQpLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPERldm9sdmU+KSA9PiByZXNwb25zZS5vayksXG4gICAgICAgICAgICAgICAgbWFwKChwYXRpZW50OiBIdHRwUmVzcG9uc2U8RGV2b2x2ZT4pID0+IHBhdGllbnQuYm9keSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKDxEZXZvbHZlPnt9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBST1VURVM6IFJvdXRlcyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZTogJ0NsaWVudCBEZXZvbHZlbWVudCcsXG4gICAgICAgICAgICBicmVhZGNydW1iOiAnQ0xJRU5UIERFVk9MVkVNRU5UJ1xuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvcGF0aWVudC86cGF0aWVudElkL3ZpZXcnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogRGV2b2x2ZURldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6IERldm9sdmVSZXNvbHZlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcml0aWVzOiBbJ1JPTEVfVVNFUiddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NsaWVudCBEZXZvbHZlJyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0NMSUVOVCBERVZPTFZFJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9jYW5BY3RpdmF0ZTogW1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdwYXRpZW50LzpwYXRpZW50SWQvbmV3JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IERldm9sdmVFZGl0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXRpZXM6IFsnUk9MRV9ERUMnXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDbGllbnQgRGV2b2x2ZScsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdERVZPTFZFIENMSUVOVCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnOmlkL3BhdGllbnQvOnBhdGllbnRJZC9lZGl0JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IERldm9sdmVFZGl0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBEZXZvbHZlUmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Rldm9sdmUgRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdERVZPTFZFIEVESVQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL2NhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3JldHVybi9wYXRpZW50LzpwYXRpZW50SWQvbmV3JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IEVuZERldm9sdmVDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0VuZCBEZXZvbHZlJyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0VORCBDTElFTlQgREVWT0xWRSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXTtcblxuIl19
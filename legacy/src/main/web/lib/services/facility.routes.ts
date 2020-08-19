import { Routes } from '@angular/router';
import { FacilityComponent } from '../components/facility.component';

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Facility Switch',
            breadcrumb: 'FACILITY SWITCH'
        },
        children: [
            {
                path: '',
                component: FacilityComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    title: 'Facility Switch',
                    breadcrumb: 'FACILITY SWITCH'
                },
                //canActivate: [UserRouteAccessService]
            },
        ]
    }
];

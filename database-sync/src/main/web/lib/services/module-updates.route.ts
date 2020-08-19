import { Routes } from '@angular/router';
import { ModuleUpdatesComponent } from '../components/module-updates.component';

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Module Updates',
            breadcrumb: 'MODULE UPDATES'
        },
        children: [
            {
                path: '',
                component: ModuleUpdatesComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    title: 'Module Updates',
                    breadcrumb: 'MODULE UPDATES'
                },
                //canActivate: [UserRouteAccessService]
            }
        ]
    }
];


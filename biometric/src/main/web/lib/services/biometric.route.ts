import { Routes } from '@angular/router';
import { BiometricEditComponent } from '../components/biometric-edit.component';


export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Biometric Enrollment',
            breadcrumb: 'BIOMETRIC ENROLLMENT'
        },
        children: [
            {
                path: 'patient/:patientId/new',
                component: BiometricEditComponent,
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'Biometrics Enrollment',
                    breadcrumb: 'BIOMETRIC ENROLLMENT'
                },
                //canActivate: [UserRouteAccessService]
            }
        ]
    }
];


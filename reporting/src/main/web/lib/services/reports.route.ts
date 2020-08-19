import { Routes } from '@angular/router';
import { ArtSummaryComponent } from '../components/art-summary.component';
import { PatientLineListComponent } from '../components/patient-line-list.component';
import { DataConversionComponent } from '../components/data-conversion.component';


export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Reports',
            breadcrumb: 'REPORTS'
        },
        children: [
            {
                path: 'art-summary',
                component: ArtSummaryComponent,
                data: {
                    breadcrumb: 'ART SUMMARY REPORT',
                    title: 'ART Summary Report'
                },
            },
            {
                path: 'patients',
                children: [
                    {
                        path: 'line-list',
                        component: PatientLineListComponent,
                        data: {
                            breadcrumb: 'PATIENT LINE LIST',
                            title: 'Patient Line List'
                        }
                    }
                ],
                data: {
                    breadcrumb: 'PATIENT REPORTS',
                    title: 'Patient Reports'
                }
            },
            {
                path: 'data-conversion',
                component: DataConversionComponent,
                data: {
                    breadcrumb: 'DATA CONVERSION',
                    title: 'Data Conversion'
                }
            }
        ]
    }
];


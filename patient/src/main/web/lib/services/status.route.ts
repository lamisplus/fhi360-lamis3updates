import { ClientStatusComponent } from '../components/client-status.component';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { StatusHistory } from '../model/patient.model';
import { PatientService } from './patient.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class StatusResolve implements Resolve<StatusHistory> {
    constructor(private service: PatientService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StatusHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findClientStatus(id).pipe(
                filter((response: HttpResponse<StatusHistory>) => response.ok),
                map((patient: HttpResponse<StatusHistory>) => patient.body)
            );
        }
        return of(<StatusHistory>{});
    }
}

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Clinic Visit',
            breadcrumb: 'CLINIC VISIT'
        },
        children: [
            {
                path: 'patient/:patientId/new',
                component: ClientStatusComponent,
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'Update Client Status',
                    breadcrumb: 'UPDATE CLIENT STATUS'
                },
                //canActivate: [UserRouteAccessService]
            },
            {
                path: ':id/patient/:patientId/edit',
                component: ClientStatusComponent,
                resolve: {
                    entity: StatusResolve
                },
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'Client Status Edit',
                    breadcrumb: 'CLIENT STATUS EDIT'
                },
                //canActivate: [UserRouteAccessService]
            }
        ]
    }
];

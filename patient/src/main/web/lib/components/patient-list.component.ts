import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@alfresco/adf-core';
import { Patient } from '../model/patient.model';
import { Facility } from '../model/facility.model';

@Component({
    selector: 'lamis-patients',
    templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit, OnDestroy {
    @Input()
    path: string;
    page = 0;
    patients: Patient[];
    loading = false;
    public itemsPerPage: number = 10;
    public currentSearch: string = '';
    totalItems = 0;
    display = 'list';
    facility: Facility = {};

    constructor(private patientService: PatientService,
                protected notification: NotificationService,
                protected router: Router,
                protected activatedRoute: ActivatedRoute) {
        this.currentSearch = '';
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.patientService.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.onPageChange(0);
        })
    }

    searchPatient(search: any) {
        this.currentSearch = search;
        this.page = 0;
        this.loadAll();
    }


    public select(data: any): any {
        if (!!this.path) {
            this.router.navigateByUrl(`${this.path}/${data.obj.uuid}`)
        } else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
        }
    }

    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    }

    loadPage(page: number) {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.patientService.query({
            keyword: this.currentSearch,
            page: this.page > 0 ? this.page - 1 : 0,
            facilityId: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(
            (res: any) => {
                this.onSuccess(res.body, res.headers)
            },
            (res: any) => this.onError(res)
        );
    }

    protected onSuccess(data: any, headers: any) {
        this.patients = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }

    private onError(error: any) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
}


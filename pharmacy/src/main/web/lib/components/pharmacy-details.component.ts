import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Pharmacy, PharmacyLine, RegimenInfo } from '../model/pharmacy.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { TdDialogService } from '@covalent/core';
import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewIntItemModel,
    CardViewItem,
    CardViewTextItemModel,
    NotificationService
} from '@alfresco/adf-core';

@Component({
    selector: 'lamis-pharmacy',
    templateUrl: './pharmacy-details.component.html'
})
export class PharmacyDetailsComponent implements OnInit, OnDestroy {
    properties: CardViewItem[] = [];
    entity: Pharmacy;
    public dataSource: PharmacyLine[];

    constructor(private router: Router, private route: ActivatedRoute, private pharmacyService: PharmacyService,
                private _dialogService: TdDialogService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }

    edit() {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.id, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this pharmacy refill, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.pharmacyService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients'])
                    } else {
                        this.notificationService.showError('Error deleting visit, please try again')
                    }
                })
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: 'Date of Dispensing',
            format: 'dd MMM, yyyy'
        }));
        this.pharmacyService.getLinesByPharmacy(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
                this.properties.push(new CardViewIntItemModel({
                    label: 'Refill Period (days)',
                    key: 'cs',
                    value: res.map(r => r.duration)
                        .sort((r1, r2) => r1 - r2)
                        .pop()
                }));
            });

        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'MMD Type',
            key: 'fs',
            value: this.entity.mmdType
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Adverse Drug Reactions',
            key: 'adr',
            value: this.entity.adrScreened
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Prescription error',
            key: 'bw',
            value: this.entity.prescriptionError
        }));
        this.pharmacyService.regimenInfo(this.entity.patient.id)
            .subscribe((res: RegimenInfo) => {
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    }

    previousState() {
        window.history.back();
    }

    public ngOnDestroy() {
    }
}

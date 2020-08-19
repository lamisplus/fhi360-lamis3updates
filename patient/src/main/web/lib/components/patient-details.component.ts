import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Patient } from '../model/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientObservation, PatientService, PatientWidget } from '../services/patient.service';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { Moment } from 'moment';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
    selector: 'lamis-patient',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
    template = 'patient-details';
    entity: Patient;
    observations: PatientObservation[];
    @ViewChild('container', {read: ViewContainerRef, static: true}) container: ViewContainerRef;
    properties: CardViewItem[] = [];
    status: string;

    constructor(private router: Router, private route: ActivatedRoute, private patientService: PatientService,
                private cfr: ComponentFactoryResolver, private _dialogService: TdDialogService,
                private notificationService: NotificationService, private _viewContainerRef: ViewContainerRef,
                private renderer2: Renderer2) {
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.patientService.currentClientStatus(entity.uuid).subscribe(res => {
                this.status = res;
            });
            this.attacheWidgets();
            this.getObservations();
        });
    }

    edit() {
        this.router.navigate(['..', 'edit'], {relativeTo: this.route});
    }

    updateStatus() {
        this.router.navigate(['/', 'client-statuses', 'patient', this.entity.uuid, 'new']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this patient, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                this.patientService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients'])
                    } else {
                        this.notificationService.showError('Error deleting patient, please try again')
                    }
                })
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    previousState() {
        window.history.back();
    }

    private getComponentFactory(name: string) {
        const factories = Array.from(this.cfr['_factories'].values());
        return <ComponentFactory<any>>factories.find((x: any) => x.componentType.name === name);
    }

    getObservations() {
        this.patientService.observations(this.entity.id).subscribe((res: PatientObservation[]) => this.observations = res)
    }

    addObservation(action: PatientObservation) {
        const path = action.path.split('/');
        const parts = ['/'];
        parts.push(...path);
        parts.push('patient', this.entity.uuid, 'new');
        this.router.navigate([...parts]);
    }

    private attacheWidgets() {
        this.buildWidget('TimelineComponent', 'Recent Activities', 'timeline');
        this.buildWidget('SummaryWidgetComponent', 'Patient Summary', 'account_balance_wallet');
        /*this.patientService.widgets(this.entity.id).subscribe((res: PatientWidget[]) => {
            res.forEach((widget: PatientWidget) => {
                this.buildWidget(widget.componentName, widget.title, widget.icon);
            })
        });*/
    }

    public ngOnDestroy() {
    }

    private buildWidget(componentName: string, title: string, icon: string) {
        const factory = this.getComponentFactory(componentName);
        if (factory !== undefined) {
            const parentFactory = this.getComponentFactory('WidgetContainerComponent');
            const componentRef = this.container.createComponent(parentFactory);
            if (!componentRef.instance.embeddedContainer) {
                const cmpName = componentRef.instance.constructor.name;
                throw new TypeError(`Trying to render embedded content. ${cmpName} must have @ViewChild() embeddedContainer defined`);
            }
            console.log('Created component', componentRef);
            const instanceRef = componentRef.instance.embeddedContainer.createComponent(factory);
            this.renderer2.addClass(componentRef.location.nativeElement, 'col-md-6');
            componentRef.instance.icon = icon;
            componentRef.instance.title = title;
            try {
                instanceRef.instance.patientId = this.entity.id;
                instanceRef.instance.patientUuid = this.entity.uuid;
            } catch (e) {

            }
        }
    }

    age(dob: Moment) {
        let age = moment().diff(dob, 'years');
        if (age > 0) {
            return age + ' year(s)'
        }

        age = moment().diff(dob, 'months');
        if (age > 0) {
            return age + ' month(s)';
        }
        return moment().diff(dob, 'weeks') + ' week(s)';
    }
}

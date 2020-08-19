import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormioComponent } from 'angular-material-formio';
import { Formio } from 'formiojs';
import { LocalStorageService, SessionStorageService } from 'ngx-store';
import { LayoutTemplateService } from '../../services/layout.template.service';

@Component({
    selector: 'json-form',
    template: `
        <mat-formio [form]="form"
                    (ready)="reset()"
                    (customEvent)="onCustomEvent($event)"
                    (change)="change($event)">
        </mat-formio>
    `
})
export class JsonFormComponent implements OnInit, OnChanges {
    @ViewChild(FormioComponent, {static: true})
    formio: FormioComponent;

    @Input()
    template: string;
    @Input()
    templateId: string;
    @Input()
    model: any;
    @Output()
    dataEvent: EventEmitter<any> = new EventEmitter(true);
    customEvent: EventEmitter<any> = new EventEmitter(true);
    form: any = {};
    isValid = false;

    constructor(private templateService: LayoutTemplateService, private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService) {
    }

    ngOnInit(): void {
        if (this.templateId) {
            this.templateService.getTemplate(this.templateId).subscribe((json: any) => {
                this.form = json.form;
            });
        } else {
            this.form = this.template;
        }
    }

    reset() {
        this.formio.onRefresh({
            submission: this.model
        });
    }

    onCustomEvent(event: any) {
        this.customEvent.emit(event);
    }

    change(event: any) {
        if (event.hasOwnProperty('isValid')) {
            this.isValid = event.isValid;
            if (this.isValid) {
                this.dataEvent.emit(event.data);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['model']) {
            const token = this.localStorage.get('authenticationToken') || this.sessionStorage.get('authenticationToken');
            this.model = {
                data: Object.assign({}, changes['model'].currentValue, {authorization: token})
            };
        }
    }
}

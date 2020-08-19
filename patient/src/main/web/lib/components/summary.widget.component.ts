import { Component, Input, OnInit } from '@angular/core';
import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewDatetimeItemModel,
    CardViewFloatItemModel,
    CardViewIntItemModel,
    CardViewItem,
    CardViewTextItemModel
} from '@alfresco/adf-core';
import { FieldType } from '@lamis/web-core';
import { PatientService } from '../services/patient.service';
import * as moment_ from 'moment';

const moment = moment_;

export interface Summary {
    header?: string;
    headerClass?: string;
    fields: Field[];
}

export interface Field {
    type: FieldType;
    label: string;
    value: any;
}

@Component({
    selector: 'patient-summary-widget',
    templateUrl: './summary.widget.component.html'
})
export class SummaryWidgetComponent implements OnInit {
    @Input()
    patientId: number;
    @Input()
    patientUuid: string;
    @Input()

    summaries: Summary[];

    constructor(private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.patientService.getSummaryForPatient(this.patientId).subscribe(res => this.summaries = res)
    }

    public propertiesForSummary(summary: Summary): Array<CardViewItem> {
        const properties = [];
        for (const field of summary.fields) {
            const dataType = field.type.toLowerCase();
            let item: CardViewItem;
            switch (dataType) {
                case FieldType.boolean:
                    item = new CardViewBoolItemModel({
                        value: field.value,
                        key: '',
                        label: field.label
                    });
                    break;
                case FieldType.int:
                    item = new CardViewIntItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.float:
                    item = new CardViewFloatItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.date:
                    item = new CardViewDateItemModel({
                        value: field.value ? moment(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy'
                    });
                    break;
                case FieldType.datetime:
                    item = new CardViewDatetimeItemModel({
                        value: field.value ? moment(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy HH:mm'
                    });
                    break;
                default:
                    item = new CardViewTextItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
            }
            properties.push(item);
        }
        return properties;
    }
}

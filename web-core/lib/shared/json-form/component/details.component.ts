import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import get from 'lodash.get';
import { LayoutTemplateService } from '../../../services/layout.template.service';
import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewDatetimeItemModel,
    CardViewFloatItemModel,
    CardViewIntItemModel,
    CardViewItem,
    CardViewTextItemModel
} from '@alfresco/adf-core';

export interface Detail {
    header?: string;
    headerClass?: string;
    fields: Field[];
}

export interface Field {
    type: FieldType;
    key: string;
    label: string;
}

export enum FieldType {
    date = 'date',
    datetime = 'datetime',
    text = 'text',
    boolean = 'boolean',
    int = 'int',
    float = 'float'
}

@Component({
    selector: 'details-component',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
    @Input()
    template: string;

    @Input()
    model: any;

    details: Detail[];

    constructor(private templateService: LayoutTemplateService) {
    }

    ngOnInit(): void {
        this.templateService.getTemplate(this.template).subscribe((json: any) => {
            this.details = json.template;
        });
    }

    public propertiesForDetail(detail: Detail): Array<CardViewItem> {
        const properties = [];
        for (const field of detail.fields) {
            const dataType = field.type;
            let item: CardViewItem;
            switch (dataType) {
                case FieldType.boolean:
                    item = new CardViewBoolItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label
                    });
                    break;
                case FieldType.int:
                    item = new CardViewIntItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.float:
                    item = new CardViewFloatItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.date:
                    item = new CardViewDateItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy'
                    });
                    break;
                case FieldType.datetime:
                    item = new CardViewDatetimeItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy HH:mm'
                    });
                    break;
                default:
                    item = new CardViewTextItemModel({
                        value: this.getValueForKey(field.key),
                        key: '',
                        label: field.label,
                    });
            }
            properties.push(item);
        }
        return properties;
    }

    private getValueForKey(key: string): any {
        return get(this.model, key);
    }
}

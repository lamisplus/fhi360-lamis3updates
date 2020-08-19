import { Component, Input, OnChanges } from '@angular/core';
import { CardViewTextContentItemModel } from '../../models/card-view-text-content-item.model';

@Component({
    selector: 'card-view-text-context',
    templateUrl: './card-view-text-context-item.component.html',
    styleUrls: ['./card-view-html-text-item.component.scss']
})
export class CardViewTextContentItemComponent implements OnChanges {
    @Input()
    property: CardViewTextContentItemModel;

    constructor() {
    }

    ngOnChanges(): void {
    }

}

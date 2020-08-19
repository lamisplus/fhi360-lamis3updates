import {
    CardViewBaseItemModel,
    CardViewItem,
    CardViewTextItemProperties,
    DynamicComponentModel
} from '@alfresco/adf-core';

export class CardViewTextContentItemModel extends CardViewBaseItemModel implements CardViewItem, DynamicComponentModel {
    type = 'text-content';

    constructor(obj: CardViewTextItemProperties) {
        super(obj);
    }

    get displayValue() {
        if (this.isEmpty()) {
            return this.default;
        } else {
            return this.value;
        }
    }
}

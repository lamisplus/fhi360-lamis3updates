import { CardItemTypeService, CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CardViewTextContentItemComponent } from './components';

export function components() {
    return [
        CardViewTextContentItemComponent
    ];
}

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule
    ],
    declarations: components(),
    exports: components(),
    entryComponents: components(),
    providers: [
        CardItemTypeService
    ]
})
export class CardViewExtModule {
    constructor(private cardItemTypeService: CardItemTypeService) {
        cardItemTypeService.setComponentTypeResolver('text-content', () => CardViewTextContentItemComponent);
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { RadetConverterComponent } from './components/radet-converter.component';
import { RadetConverterService } from './services/radet-converter.service';
import { ROUTES } from './services/radet.route';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
    declarations: [
        RadetConverterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatTabsModule,
        RouterModule.forChild(ROUTES),
        MatProgressBarModule,
        MatListModule,
        MatCheckboxModule,
        DateRangePickerModule,
        DropDownListModule,
        DatePickerModule,
    ],
    exports: [
        RadetConverterComponent
    ],
    providers: [
        RadetConverterService
    ]
})
export class RadetModule {
}

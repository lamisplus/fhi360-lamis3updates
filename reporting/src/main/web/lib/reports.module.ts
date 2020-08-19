import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ArtSummaryComponent } from './components/art-summary.component';
import { ROUTES } from './services/reports.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PatientLineListComponent } from './components/patient-line-list.component';
import { MatDateFormatModule } from '@lamis/web-core';
import { DataConversionComponent } from './components/data-conversion.component';

@NgModule({
    declarations: [
        ArtSummaryComponent,
        DataConversionComponent,
        PatientLineListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatTabsModule,
        MatDatepickerModule,
        RouterModule.forChild(ROUTES),
        MatProgressBarModule,
        MatListModule,
        MatCheckboxModule,
        DateRangePickerModule,
        DropDownListModule,
        DatePickerModule,
        MatDateFormatModule,
        MatRadioModule
    ],
    exports: [
        ArtSummaryComponent,
        DataConversionComponent,
        PatientLineListComponent
    ],
    providers: []
})
export class ReportsModule {
}

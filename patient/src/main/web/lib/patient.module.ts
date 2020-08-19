import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CovalentDialogsModule, CovalentMessageModule, CovalentSearchModule } from '@covalent/core';
import { JsonFormModule, LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { PatientDetailsComponent } from './components/patient-details.component';
import { PatientEditComponent } from './components/patient-edit.component';
import { PatientListComponent } from './components/patient-list.component';
import { PatientResolve, ROUTES } from './services/patient.route';
import { WidgetContainerComponent } from './components/widget-container.component';
import { TimelineComponent } from './components/timeline.component';
import { TimelineWidgetModule } from './widget/timeline.widget.module';
import { MatFormioModule } from 'angular-material-formio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueHospitalNumValidator } from './components/unique-hospital-num.validator';
import { CustomFormsModule } from 'ng2-validation';
import { DetailedTimelineComponent } from './components/detailed.timeline.component';
import { SummaryWidgetComponent } from './components/summary.widget.component';

@NgModule({
    declarations: [
        PatientListComponent,
        PatientDetailsComponent,
        PatientEditComponent,
        WidgetContainerComponent,
        TimelineComponent,
        DetailedTimelineComponent,
        SummaryWidgetComponent,
        UniqueHospitalNumValidator
    ],
    imports: [
        CommonModule,
        NgJhipsterModule,
        LamisSharedModule,
        JsonFormModule,
        MatFormioModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        RouterModule.forChild(ROUTES),
        MatProgressBarModule,
        CovalentMessageModule,
        MatListModule,
        MatChipsModule,
        CoreModule,
        CovalentDialogsModule,
        CovalentSearchModule,
        NgbPaginationModule,
        TimelineWidgetModule,
        FormsModule,
        ReactiveFormsModule,
        MatDateFormatModule,
        CustomFormsModule,
        MatAutocompleteModule
    ],
    exports: [
        PatientListComponent,
        PatientDetailsComponent,
        PatientEditComponent
    ],
    entryComponents: [
        WidgetContainerComponent,
        TimelineComponent,
        SummaryWidgetComponent
    ],
    providers: [
        //PatientService,
        //ObservationService,
        PatientResolve
    ]
})
export class PatientModule {
}

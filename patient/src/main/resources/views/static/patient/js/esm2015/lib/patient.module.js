import * as tslib_1 from "tslib";
import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatSelectModule, MatTabsModule } from '@angular/material';
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
let PatientModule = class PatientModule {
};
PatientModule = tslib_1.__decorate([
    NgModule({
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
], PatientModule);
export { PatientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMy4wLyIsInNvdXJjZXMiOlsibGliL3BhdGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRyxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQTJEL0UsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUN6QixDQUFBO0FBRFksYUFBYTtJQXpEekIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1Ysb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixvQkFBb0I7WUFDcEIsd0JBQXdCO1lBQ3hCLGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIsc0JBQXNCO1lBQ3RCLDBCQUEwQjtTQUM3QjtRQUNELE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsY0FBYztZQUNkLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGFBQWE7WUFDYixjQUFjO1lBQ2QsVUFBVTtZQUNWLHFCQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIscUJBQXFCO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixvQkFBb0I7U0FDdkI7UUFDRCxlQUFlLEVBQUU7WUFDYix3QkFBd0I7WUFDeEIsaUJBQWlCO1lBQ2pCLHNCQUFzQjtTQUN6QjtRQUNELFNBQVMsRUFBRTtZQUNQLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsY0FBYztTQUNqQjtLQUNKLENBQUM7R0FDVyxhQUFhLENBQ3pCO1NBRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0Q2hpcHNNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsIENvdmFsZW50U2VhcmNoTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xyXG5pbXBvcnQgeyBKc29uRm9ybU1vZHVsZSwgTGFtaXNTaGFyZWRNb2R1bGUsIE1hdERhdGVGb3JtYXRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xyXG5pbXBvcnQgeyBOZ2JQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xyXG5pbXBvcnQgeyBOZ0poaXBzdGVyTW9kdWxlIH0gZnJvbSAnbmctamhpcHN0ZXInO1xyXG5pbXBvcnQgeyBQYXRpZW50RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGF0aWVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBhdGllbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYXRpZW50UmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9wYXRpZW50LnJvdXRlJztcclxuaW1wb3J0IHsgV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dpZGdldC1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZWxpbmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZWxpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZWxpbmVXaWRnZXRNb2R1bGUgfSBmcm9tICcuL3dpZGdldC90aW1lbGluZS53aWRnZXQubW9kdWxlJztcclxuaW1wb3J0IHsgTWF0Rm9ybWlvTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1tYXRlcmlhbC1mb3JtaW8nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvdW5pcXVlLWhvc3BpdGFsLW51bS52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDdXN0b21Gb3Jtc01vZHVsZSB9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgRGV0YWlsZWRUaW1lbGluZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kZXRhaWxlZC50aW1lbGluZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N1bW1hcnkud2lkZ2V0LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudERldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudEVkaXRDb21wb25lbnQsXHJcbiAgICAgICAgV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIFRpbWVsaW5lQ29tcG9uZW50LFxyXG4gICAgICAgIERldGFpbGVkVGltZWxpbmVDb21wb25lbnQsXHJcbiAgICAgICAgU3VtbWFyeVdpZGdldENvbXBvbmVudCxcclxuICAgICAgICBVbmlxdWVIb3NwaXRhbE51bVZhbGlkYXRvclxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTmdKaGlwc3Rlck1vZHVsZSxcclxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcclxuICAgICAgICBKc29uRm9ybU1vZHVsZSxcclxuICAgICAgICBNYXRGb3JtaW9Nb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50U2VhcmNoTW9kdWxlLFxyXG4gICAgICAgIE5nYlBhZ2luYXRpb25Nb2R1bGUsXHJcbiAgICAgICAgVGltZWxpbmVXaWRnZXRNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxyXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBQYXRpZW50TGlzdENvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50RGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50RWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIFdpZGdldENvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCxcclxuICAgICAgICBTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLy9QYXRpZW50U2VydmljZSxcclxuICAgICAgICAvL09ic2VydmF0aW9uU2VydmljZSxcclxuICAgICAgICBQYXRpZW50UmVzb2x2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudE1vZHVsZSB7XHJcbn1cclxuIl19
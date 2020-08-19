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
var PatientModule = /** @class */ (function () {
    function PatientModule() {
    }
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
    return PatientModule;
}());
export { PatientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMy4wLyIsInNvdXJjZXMiOlsibGliL3BhdGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRyxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQTJEL0U7SUFBQTtJQUNBLENBQUM7SUFEWSxhQUFhO1FBekR6QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1Ysb0JBQW9CO2dCQUNwQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIsd0JBQXdCO2dCQUN4QixpQkFBaUI7Z0JBQ2pCLHlCQUF5QjtnQkFDekIsc0JBQXNCO2dCQUN0QiwwQkFBMEI7YUFDN0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsYUFBYTtnQkFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Isb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxVQUFVO2dCQUNWLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2dCQUNqQixxQkFBcUI7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsb0JBQW9CO2dCQUNwQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjthQUN2QjtZQUNELGVBQWUsRUFBRTtnQkFDYix3QkFBd0I7Z0JBQ3hCLGlCQUFpQjtnQkFDakIsc0JBQXNCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGlCQUFpQjtnQkFDakIscUJBQXFCO2dCQUNyQixjQUFjO2FBQ2pCO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FDekI7SUFBRCxvQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdENoaXBzTW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRNZXNzYWdlTW9kdWxlLCBDb3ZhbGVudFNlYXJjaE1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgSnNvbkZvcm1Nb2R1bGUsIExhbWlzU2hhcmVkTW9kdWxlLCBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgTmdiUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgTmdKaGlwc3Rlck1vZHVsZSB9IGZyb20gJ25nLWpoaXBzdGVyJztcclxuaW1wb3J0IHsgUGF0aWVudERldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBhdGllbnRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYXRpZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGF0aWVudFJlc29sdmUsIFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvcGF0aWVudC5yb3V0ZSc7XHJcbmltcG9ydCB7IFdpZGdldENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93aWRnZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVsaW5lQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVsaW5lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVsaW5lV2lkZ2V0TW9kdWxlIH0gZnJvbSAnLi93aWRnZXQvdGltZWxpbmUud2lkZ2V0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE1hdEZvcm1pb01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItbWF0ZXJpYWwtZm9ybWlvJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFVuaXF1ZUhvc3BpdGFsTnVtVmFsaWRhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3VuaXF1ZS1ob3NwaXRhbC1udW0udmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IERldGFpbGVkVGltZWxpbmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGV0YWlsZWQudGltZWxpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VtbWFyeVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdW1tYXJ5LndpZGdldC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFBhdGllbnRMaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnREZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRFZGl0Q29tcG9uZW50LFxyXG4gICAgICAgIFdpZGdldENvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCxcclxuICAgICAgICBEZXRhaWxlZFRpbWVsaW5lQ29tcG9uZW50LFxyXG4gICAgICAgIFN1bW1hcnlXaWRnZXRDb21wb25lbnQsXHJcbiAgICAgICAgVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3JcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5nSmhpcHN0ZXJNb2R1bGUsXHJcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgSnNvbkZvcm1Nb2R1bGUsXHJcbiAgICAgICAgTWF0Rm9ybWlvTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBNYXRDaGlwc01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudFNlYXJjaE1vZHVsZSxcclxuICAgICAgICBOZ2JQYWdpbmF0aW9uTW9kdWxlLFxyXG4gICAgICAgIFRpbWVsaW5lV2lkZ2V0TW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZSxcclxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudERldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudEVkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBXaWRnZXRDb250YWluZXJDb21wb25lbnQsXHJcbiAgICAgICAgVGltZWxpbmVDb21wb25lbnQsXHJcbiAgICAgICAgU3VtbWFyeVdpZGdldENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIC8vUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgLy9PYnNlcnZhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgUGF0aWVudFJlc29sdmVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRNb2R1bGUge1xyXG59XHJcbiJdfQ==
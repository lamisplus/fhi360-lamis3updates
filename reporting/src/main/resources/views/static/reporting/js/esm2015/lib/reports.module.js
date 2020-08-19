import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ArtSummaryComponent } from './components/art-summary.component';
import { ROUTES } from './services/reports.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PatientLineListComponent } from './components/patient-line-list.component';
import { MatDateFormatModule } from '@lamis/web-core';
import { DataConversionComponent } from './components/data-conversion.component';
let ReportsModule = class ReportsModule {
};
ReportsModule = tslib_1.__decorate([
    NgModule({
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
], ReportsModule);
export { ReportsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1yZXBvcnRpbmctMS4yLjAvIiwic291cmNlcyI6WyJsaWIvcmVwb3J0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixjQUFjLEVBQ2QsZUFBZSxFQUNmLGFBQWEsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQXFDakYsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUN6QixDQUFBO0FBRFksYUFBYTtJQW5DekIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1YsbUJBQW1CO1lBQ25CLHVCQUF1QjtZQUN2Qix3QkFBd0I7U0FDM0I7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLG9CQUFvQjtZQUNwQixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZQUNuQixjQUFjO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsbUJBQW1CO1lBQ25CLHVCQUF1QjtZQUN2Qix3QkFBd0I7U0FDM0I7UUFDRCxTQUFTLEVBQUUsRUFBRTtLQUNoQixDQUFDO0dBQ1csYUFBYSxDQUN6QjtTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRSYWRpb01vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFydFN1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXJ0LXN1bW1hcnkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9yZXBvcnRzLnJvdXRlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdE1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IERhdGVQaWNrZXJNb2R1bGUsIERhdGVSYW5nZVBpY2tlck1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWNhbGVuZGFycyc7XHJcbmltcG9ydCB7IFBhdGllbnRMaW5lTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXRpZW50LWxpbmUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUNvbnZlcnNpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YS1jb252ZXJzaW9uLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXJ0U3VtbWFyeUNvbXBvbmVudCxcclxuICAgICAgICBEYXRhQ29udmVyc2lvbkNvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50TGluZUxpc3RDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgICAgICBEYXRlUmFuZ2VQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25MaXN0TW9kdWxlLFxyXG4gICAgICAgIERhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBNYXRSYWRpb01vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBBcnRTdW1tYXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIERhdGFDb252ZXJzaW9uQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRMaW5lTGlzdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlcG9ydHNNb2R1bGUge1xyXG59XHJcbiJdfQ==
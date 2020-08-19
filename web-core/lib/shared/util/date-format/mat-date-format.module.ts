import { NgModule } from '@angular/core';
import { DatetimeAdapter, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { MAT_MOMENT_DATETIME_FORMATS, MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { MOMENT_DATE_FORMATS } from './moment-date-formats.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from './momentDateAdapter';

@NgModule({
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
        { provide: MAT_DATETIME_FORMATS, useValue: MAT_MOMENT_DATETIME_FORMATS }
    ]
})
export class MatDateFormatModule {

}

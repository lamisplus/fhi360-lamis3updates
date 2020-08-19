import { LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        DatePipe
    ]
})
export class CoreModule {
    constructor() {
        //registerLocaleData(locale);
    }
}

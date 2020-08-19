import { NgModule } from '@angular/core';
import { CervicalCancerScreeningComponent } from './components/cervical-cancer-screening/cervical-cancer-screening.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MaterialModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        CervicalCancerScreeningComponent
    ]
})
export class CervicalCancerModule {

}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgJhipsterModule } from 'ng-jhipster';
import { AlertErrorComponent } from './alert/alert-error.component';
import { AlertComponent } from './alert/alert.component';
import { CardViewExtModule } from './card-view/card-view-ext.module';
import { PhoneNumberValidator } from './phone.number.validator';
import { CommonPipesModule } from './pipes/common/common-pipes.module';

@NgModule({
    imports: [
        CommonModule,
        NgJhipsterModule,
        CommonPipesModule
    ],
    declarations: [
        AlertComponent,
        AlertErrorComponent,
        PhoneNumberValidator
    ],
    exports: [
        AlertComponent,
        AlertErrorComponent,
        CommonPipesModule,
        PhoneNumberValidator
    ]
})
export class SharedCommonModule {
}

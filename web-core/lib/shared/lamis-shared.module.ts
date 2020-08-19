import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { SharedCommonModule } from './shared-common.module';
import { AppConfirmComponent } from './util/app-confirm/app-confirm.component';
import { AppLoaderComponent } from './util/app-loader/app-loader.component';
import { AppLoaderService } from './util/app-loader/app-loader.service';
import { ToggleFullscreenDirective } from './util/fullscreen/toggle.fullscreen.directive';
import { SpeedDialFabComponent } from './util/speed-dial-fab.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedCommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    declarations: [
        HasAnyAuthorityDirective,
        SpeedDialFabComponent,
        AppConfirmComponent,
        AppLoaderComponent,
        ToggleFullscreenDirective
    ],
    entryComponents: [
        AppConfirmComponent,
        AppLoaderComponent
    ],
    exports: [
        SharedCommonModule,
        HasAnyAuthorityDirective,
        SpeedDialFabComponent,
        ToggleFullscreenDirective
    ],
    providers: [
        AppLoaderService,
        AppConfirmComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LamisSharedModule {
}

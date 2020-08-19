import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CovalentDialogsModule, CovalentMessageModule } from '@covalent/core';
import { BiometricEditComponent } from './components/biometric-edit.component';
import { ROUTES } from './services/biometric.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDateFormatModule } from '@lamis/web-core';
import { CustomFormsModule } from 'ng2-validation';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    declarations: [
        BiometricEditComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule.forChild(ROUTES),
        MatProgressBarModule,
        FormsModule,
        CovalentMessageModule,
        CovalentDialogsModule,
        MatTableModule,
        MatListModule,
        CoreModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        MatDateFormatModule,
        CustomFormsModule
    ],
    exports: [
        BiometricEditComponent
    ],
    entryComponents: [],
    providers: [
    ]
})
export class BiometricsModule {
    constructor(private _iconRegistry: MatIconRegistry,
                private _domSanitizer: DomSanitizer) {
        /*this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_thumb.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_thumb.svg'));*/
    }
}

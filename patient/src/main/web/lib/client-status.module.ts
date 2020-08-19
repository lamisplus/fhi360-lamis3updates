import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentDialogsModule } from '@covalent/core';
import { CoreModule } from '@alfresco/adf-core';
import { JsonFormModule, LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { MatFormioModule } from 'angular-material-formio';
import { RouterModule } from '@angular/router';
import { ROUTES, StatusResolve } from './services/status.route';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { ClientStatusComponent } from './components/client-status.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CovalentDialogsModule,
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
        CoreModule,
        MatDateFormatModule
    ],
    declarations: [
        ClientStatusComponent
    ],
    exports: [
        ClientStatusComponent
    ],
    providers: [
        StatusResolve
    ]
})
export class ClientStatusModule {

}

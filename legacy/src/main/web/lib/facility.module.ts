import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FacilityComponent } from './components/facility.component';
import { ROUTES } from './services/facility.routes';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        FacilityComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        FacilityComponent
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class FacilityModule {
}

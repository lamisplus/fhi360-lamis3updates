import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm',
    template: `<h1 matDialogTitle class="mb-05">{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1">{{ data.message }}</div>
    <div mat-dialog-actions>
        <button
                type="button"
                mat-raised-button
                color="primary"
                (click)="dialogRef.close(true)">OK
        </button>
        &nbsp;
        <span fxFlex></span>
        <button
                type="button"
                color="accent"
                mat-raised-button
                (click)="dialogRef.close(false)">Cancel
        </button>
    </div>`,
})
export class AppConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<AppConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }
}

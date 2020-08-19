import { CoreModule } from '@alfresco/adf-core';
import { NgModule } from '@angular/core';
import { IgxExcelModule } from 'igniteui-angular-excel';
import { IgxSpreadsheetModule } from 'igniteui-angular-spreadsheet';
import { ExcelViewerComponent } from './excel-viewer.component';
import { PreviewOverlayComponent } from './preview-overlay.component';
import { PreviewComponent } from './preview.component';

@NgModule({
    imports: [
        IgxExcelModule,
        IgxSpreadsheetModule,
        CoreModule,
    ],
    declarations: [
        ExcelViewerComponent,
        PreviewOverlayComponent,
        PreviewComponent
    ],
    exports: [
        ExcelViewerComponent,
        PreviewOverlayComponent
    ],
    entryComponents: [
        PreviewComponent
    ],
    providers: []

})
export class PreviewModule {

}

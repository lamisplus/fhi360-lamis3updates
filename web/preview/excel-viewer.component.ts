import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IgxSpreadsheetComponent } from 'igniteui-angular-spreadsheet';
import { ExcelUtility } from './excel-utility';

@Component({
    selector: 'lamis-excel',
    templateUrl: './excel-viewer.component.html'
})
export class ExcelViewerComponent implements OnInit {
    @ViewChild('spreadsheet', {read: IgxSpreadsheetComponent, static: true})
    public spreadsheet: IgxSpreadsheetComponent;
    @Input()
    excelFile: string;


    ngOnInit() {
        new ExcelUtility().loadFromUrl(this.excelFile).then((w) => {
            this.spreadsheet.workbook = w;
        });
    }
}

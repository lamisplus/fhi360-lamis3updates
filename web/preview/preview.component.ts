import { BaseEvent, ViewUtilService } from '@alfresco/adf-core';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'lamis-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
    content: any;
    displayName = '';
    urlFile = '';

    constructor(private viewUtilService: ViewUtilService) {
    }

    ngOnInit() {
    }

    public ngOnDestroy() {
    }

    print(event: BaseEvent<any>) {
        event.preventDefault();
        if (!!this.urlFile) {
            this.viewUtilService.printFile(this.urlFile, null);
        } else {
            const url = URL.createObjectURL(this.content);
            this.viewUtilService.printFile(url, null);
        }
    }
}

import { Component } from '@angular/core';

@Component({
    selector: 'timeline-header',
    template: `
        <div class='timeline-header'>
            <ng-content></ng-content>
        </div>
    `
})
export class TimelineHeader {

}

import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';

@Component({
    selector: 'timeline-panel',
    template:
            `
        <div class='timeline-panel'>
            <ng-content></ng-content>
        </div>`
})
export class TimelinePanel {
    constructor(private event: TimelineEvent) {
    }
}

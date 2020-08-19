import { Component } from '@angular/core';
import { TimelineEvent } from './timeline.event';

@Component({
    selector: 'timeline-badge',
    template: `
        <div class='timeline-badge'>
            <ng-content></ng-content>
        </div>
    `
})
export class TimelineBadge {
    constructor(private event: TimelineEvent) {
    }
}

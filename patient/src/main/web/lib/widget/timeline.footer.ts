import { Component } from '@angular/core';

@Component({
    selector: 'timeline-footer',
    template: `
        <div class='timeline-footer'>
            <ng-content></ng-content>
        </div>
    `
})
export class TimelineFooter {
    
}

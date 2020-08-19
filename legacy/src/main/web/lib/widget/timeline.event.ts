import { Component, Input, OnInit } from '@angular/core';
import { TimelineWidget } from './timeline.widget';

@Component({
    selector: 'timeline-event',
    templateUrl: './timeline.event.html'
})
export class TimelineEvent implements OnInit {

    oddClass;
    evenClass;
    _side: string = 'left';
    @Input()
    set side(side: string) {
        this._side = side;
        this.updateRowClasses(this._side);
    }
    
    constructor(private parent: TimelineWidget) {
    }

    ngOnInit(): void {
        this.updateRowClasses(this._side);
    }

    checkClass(side, leftSide) {
        let leftClass = '';
        let rightClass = 'timeline-inverted';

        if (side === 'left' || (!side && leftSide === true)) {
            return leftClass;
        } else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        } else if (side === 'right') {
            return rightClass;
        } else {
            return leftClass;
        }
    }

    updateRowClasses(value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    }
}

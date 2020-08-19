import {Directive, HostListener} from '@angular/core';
import * as screenfull_ from 'screenfull';

const screenfull = screenfull_;

@Directive({
    selector: '[toggleFullscreen]'
})
export class ToggleFullscreenDirective {
    @HostListener('click') onClick() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
}

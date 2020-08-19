import { Component, Input, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab-animation';

@Component({
    selector: 'speed-dial',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    ngOnInit(): void {
        this.links.forEach(link => this.buttonState.push(link));
    }

    @Input()
    links: { state: string, icon: string, tooltip: string }[];

    fabTogglerState = 'inactive';
    buttons: any[] = [];
    buttonState: any[] = [];

    constructor() {

    }

    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.buttonState;
    }

    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = []
    }

    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
}

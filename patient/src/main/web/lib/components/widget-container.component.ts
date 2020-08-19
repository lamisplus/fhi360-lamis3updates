import { Component, HostBinding, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector:'widget-container',
    templateUrl: './widget-container.component.html',
    styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent {
    @Input()
    title: string;
    @Input()
    icon: string;

    @ViewChild('container', { read: ViewContainerRef,  static: true })
    embeddedContainer: ViewContainerRef;
}

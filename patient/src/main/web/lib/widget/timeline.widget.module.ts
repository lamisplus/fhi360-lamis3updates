import { NgModule } from '@angular/core';
import { TimelineWidget } from './timeline.widget';
import { TimelineEvent } from './timeline.event';
import { TimelineBadge } from './timeline.badge';
import { TimelineFooter } from './timeline.footer';
import { TimelineHeader } from './timeline.header';
import { TimelinePanel } from './timeline.panel';

const COMPONENTS = [TimelineBadge, TimelineEvent, TimelineFooter, TimelineHeader, TimelinePanel, TimelineWidget];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class TimelineWidgetModule {

}

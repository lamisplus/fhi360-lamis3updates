import { NgModule } from '@angular/core';
import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from './excerpt.pipe';
import { KeysPipe } from './keys.pipe';
import { MapValuesPipe } from './map-value.pipe';
import { NairaPipe } from './naira.pipe';

@NgModule({
    declarations: [
        RelativeTimePipe,
        ExcerptPipe,
        KeysPipe,
        MapValuesPipe,
        NairaPipe
    ],
    exports: [
        RelativeTimePipe,
        ExcerptPipe,
        KeysPipe,
        MapValuesPipe,
        NairaPipe
    ]
})
export class CommonPipesModule {
}

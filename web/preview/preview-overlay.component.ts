import { Component, ComponentFactoryResolver, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IgxOverlayService } from 'igniteui-angular';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PreviewComponent } from './preview.component';
import { Preview, PreviewService } from './preview.service';

@Component({
    selector: 'preview-overlay',
    template: `
        <div class="overlay" #preview>
            <template #container></template>
        </div>
    `,
    styleUrls: ['./preview.component.scss']
})
export class PreviewOverlayComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<boolean>();
    private subscription: Subscription;
    private _overlayId: string;
    @ViewChild('preview', {read: ElementRef, static: true})
    private previewRef: ElementRef;
    @ViewChild('container', {read: ViewContainerRef, static: true})
    private container: ViewContainerRef;

    constructor(
        private previewService: PreviewService,
        @Inject(IgxOverlayService) public overlayService: IgxOverlayService,
        private cfr: ComponentFactoryResolver
    ) {
        //  overlay service deletes the id when onClosed is called. We should clear our id
        //  also in same event
        this.overlayService
            .onClosed
            .pipe(
                filter((x) => x.id === this._overlayId),
                takeUntil(this.destroy$))
            .subscribe(() => delete this._overlayId);
    }

    public showOverlay() {
        if (!this._overlayId) {
            this._overlayId = this.overlayService.attach(this.previewRef);
        }

        this.overlayService.show(this._overlayId);
    }

    ngOnInit(): void {
        this.subscription = this.previewService.getPreview().subscribe((preview: Preview) => {
            this.container.clear();
            const resolver = this.cfr.resolveComponentFactory(PreviewComponent);
            const previewComponent = <PreviewComponent>this.container.createComponent(resolver).instance;
            if (preview.url) {
                previewComponent.urlFile = preview.url;
            } else {
                previewComponent.displayName = preview.name;
                previewComponent.content = preview.content;
            }
            this.showOverlay();
        });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
        this.subscription.unsubscribe();
    }
}

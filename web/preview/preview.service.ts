import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Preview {
    content?: Blob;
    name?: string;
    url?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PreviewService {
    private subject = new Subject<Preview>();

    showResource(resourceUrl): void {
        this.subject.next({url: resourceUrl});
    }

    showBlob(name: string, content: Blob): void {
        this.subject.next({content, name});
    }

    public getPreview(): Observable<Preview> {
        return this.subject.asObservable();
    }
}

import { Component, OnDestroy } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { NotificationService } from '@alfresco/adf-core';

@Component({
    selector: 'alert-error',
    template: ``
})
export class AlertErrorComponent implements OnDestroy {
    cleanHttpErrorListener: Subscription;

    constructor(private notification: NotificationService, private eventManager: JhiEventManager) {
        /* tslint:enable */
        this.cleanHttpErrorListener = eventManager.subscribe('app.httpError', response => {
            let i;
            const httpErrorResponse = response.content;
            switch (httpErrorResponse.status) {
                // connection refused, server not reachable
                case 0:
                    this.addErrorAlert('Server not reachable', 'error.server.not.reachable');
                    break;

                case 400:
                    const arr = httpErrorResponse.headers.keys();
                    let errorHeader = null;
                    let entityKey = null;
                    arr.forEach(entry => {
                        if (entry.endsWith('app-error')) {
                            errorHeader = httpErrorResponse.headers.get(entry);
                        } else if (entry.endsWith('app-params')) {
                            entityKey = httpErrorResponse.headers.get(entry);
                        }
                    });
                    if (errorHeader) {
                        this.addErrorAlert(errorHeader, errorHeader, {entityName: entityKey});
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
                        const fieldErrors = httpErrorResponse.error.fieldErrors;
                        for (i = 0; i < fieldErrors.length; i++) {
                            const fieldError = fieldErrors[i];
                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                            const fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
                            this.addErrorAlert('Error on field "' + fieldName + '"', 'error.' + fieldError.message, {fieldName});
                        }
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.params
                        );
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
                    break;

                case 404:
                    this.addErrorAlert('Not found', 'error.url.not.found');
                    break;

                default:
                    if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(httpErrorResponse.error.message);
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
            }
        });
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
        }
    }

    addErrorAlert(message, key?, data?) {
        this.notification.showError(message);
    }
}

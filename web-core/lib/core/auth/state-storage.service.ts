import { Injectable, Injector } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-store';

@Injectable({providedIn: 'root'})
export class StateStorageService {
    private $sessionStorage: SessionStorageService;

    constructor(private injector: Injector) {
        this.$sessionStorage = injector.get(SessionStorageService);
    }

    getPreviousState() {
        return this.$sessionStorage.get('previousState');
    }

    resetPreviousState() {
        this.$sessionStorage.remove('previousState');
    }

    storePreviousState(previousStateName: any, previousStateParams: any) {
        const previousState = {name: previousStateName, params: previousStateParams};
        this.$sessionStorage.set('previousState', previousState);
    }

    getDestinationState() {
        return this.$sessionStorage.get('destinationState');
    }

    storeUrl(url: string) {
        this.$sessionStorage.set('previousUrl', url);
    }

    getUrl() {
        return this.$sessionStorage.get('previousUrl');
    }

    storeDestinationState(destinationState: any, destinationStateParams: any, fromState: any) {
        const destinationInfo = {
            destination: {
                name: destinationState.name,
                data: destinationState.data
            },
            params: destinationStateParams,
            from: {
                name: fromState.name
            }
        };
        this.$sessionStorage.set('destinationState', destinationInfo);
    }
}

import { CardViewModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormioModule } from 'angular-material-formio';
import { Formio } from 'formiojs';
import { LocalStorageService, SessionStorageService } from 'ngx-store';
import { isObject } from 'util';
import { DetailsComponent } from './component/details.component';
import { JsonFormComponent } from './json-form.component';

@NgModule({
    imports: [MatFormioModule, CommonModule, CardViewModule],
    declarations: [JsonFormComponent, DetailsComponent],
    exports: [JsonFormComponent, DetailsComponent, MatFormioModule],
    entryComponents: [JsonFormComponent]
})
export class JsonFormModule {
    constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {
        const token = this.localStorage.get('authenticationToken') || this.sessionStorage.get('authenticationToken');
        Formio.getRequestArgs = (formio, type, url, method, data, opts) => {
            method = (method || 'GET').toUpperCase();
            if (!opts || !isObject(opts)) {
                opts = {};
            }
            opts['Authorization'] = token;
            const requestArgs = {
                url,
                method,
                data: data || null,
                opts
            };

            if (type) {
                requestArgs['type'] = type;
            }

            if (formio) {
                requestArgs['formio'] = formio;
            }
            return requestArgs;
        };
    }
}

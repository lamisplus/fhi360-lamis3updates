import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '@lamis/web-core';
import { Module } from '../model/module.model';

@Injectable({
    providedIn: 'root'
})
export class ModuleUpdateService {
    public resourceUrl = '';

    constructor(protected http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/module-updates';
    }

    installUpdates() {
        return this.http.get<Module[]>(`${this.resourceUrl}/install-updates`);
    }

    availableUpdates() {
        return this.http.get<Module[]>(`${this.resourceUrl}/available-updates`);
    }
}

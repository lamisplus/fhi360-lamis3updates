import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '@lamis/web-core';

@Injectable({providedIn:'root'})
export class ObservationService {
    resourceUrl: string = '';

    constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api';
    }

    deleteObservation(path: string, id: string) {
        return this.http.delete(`${this.resourceUrl}/${path}/${id}`, {observe: 'response'})
    }

    getObservation(path: string, id: string) {
        return this.http.get<any>(`${this.resourceUrl}/${path}/by-uuid/${id}`,{observe: 'response'})
    }
}

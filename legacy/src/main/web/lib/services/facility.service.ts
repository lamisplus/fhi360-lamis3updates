import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '@lamis/web-core';

@Injectable({providedIn: 'root'})
export class FacilityService {
    public resourceUrl = '';

    constructor(protected http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }

    update(facility): Observable<any> {
        return this.http
            .post(`${this.resourceUrl}/switch`, facility, {observe: 'response'});
    }

    getFacilitiesByLga(id: number): Observable<any> {
        return this.http
            .get<any[]>(`${this.resourceUrl}/lga/${id}`, {observe: 'body'})
    }

    getStates() {
        return this.http.get<any[]>('/api/states')
    }

    getLgaByState(id) {
        return this.http.get<any[]>(`/api/provinces/state/${id}`)
    }

    getActive() {
        return this.http
            .get(`${this.resourceUrl}/active`, {observe: 'response'})
    }
}

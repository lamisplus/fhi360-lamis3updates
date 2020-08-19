import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../app.constants';
import { Observable } from 'rxjs';
import { Facility } from '../shared/model/facility.model';

type EntityResponseType = HttpResponse<Facility>;
type EntityArrayResponseType = HttpResponse<Facility[]>;

@Injectable({
    providedIn: 'root'
})
export class FacilityService {
    resourceUrl = '';

    constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }

    create(facility: Facility): Observable<EntityResponseType> {
        return this.http
            .post<Facility>(this.resourceUrl, facility, { observe: 'response' });
    }

    update(facility: Facility): Observable<EntityResponseType> {
        return this.http
            .put<Facility>(this.resourceUrl, facility, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<Facility>> {
        return this.http.get(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findByLga(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<Facility[]>(`${this.resourceUrl}/lga/${id}`, {observe: 'response'});
    }
}

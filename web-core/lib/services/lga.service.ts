import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../app.constants';
import { Observable } from 'rxjs';
import { ILGA } from '../shared/model/lga.model';

@Injectable({
	providedIn: 'root'
})
export class LgaService {
	resourceUrl = '';

	constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
		this.resourceUrl = serverUrl.SERVER_API_URL + '/api/lgas';
	}

	find(id: number): Observable<HttpResponse<ILGA>> {
		return this.http.get(`${this.resourceUrl}/${id}`, {observe: 'response'});
	}

	findByState(id: number): Observable<HttpResponse<ILGA[]>> {
		return this.http.get<ILGA[]>(`${this.resourceUrl}/state/${id}`, {observe: 'response'});
	}
}

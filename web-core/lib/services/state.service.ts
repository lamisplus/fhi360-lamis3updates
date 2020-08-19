import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IState } from '../shared/model/state.model';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../app.constants';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	resourceUrl = '';
	constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
		this.resourceUrl = serverUrl.SERVER_API_URL + '/api/states';
	}

	find(id: number): Observable<HttpResponse<IState>> {
		return this.http.get(`${this.resourceUrl}/${id}`, {observe: 'response'});
	}

	getStates(): Observable<HttpResponse<IState[]>> {
		return this.http.get<IState[]>(`${this.resourceUrl}`, {observe: 'response'});
	}
}

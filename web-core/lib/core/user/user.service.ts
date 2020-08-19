import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from './user.model';
import { createRequestOption } from '../../shared/util/request-util';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../../app.constants';

@Injectable({ providedIn: 'root' })
export class UserService {
    public resourceUrl;

    constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + 'api/users';
    }

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(this.serverUrl + 'api/users/authorities');
    }
}

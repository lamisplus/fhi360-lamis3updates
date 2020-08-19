import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../../app.constants';
import { IMenuItem } from '../../shared/model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
    }

    public getMenus() {
        return this.http.get<IMenuItem[]>(this.serverUrl.SERVER_API_URL + 'api/modules/menus', {});
    }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-store';
import { Observable } from 'rxjs';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../../app.constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService,
                @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // tslint:disable-next-line:max-line-length
        if (!request || !request.url || (/^http/.test(request.url) && !(this.serverUrl.SERVER_API_URL && request.url.startsWith(this.serverUrl.SERVER_API_URL)))) {
            return next.handle(request);
        }
        const token = this.localStorage.get('authenticationToken') || this.sessionStorage.get('authenticationToken');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}

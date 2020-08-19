import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-store';
import { SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '../../app.constants';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
    private $localStorage: LocalStorageService;
    private $sessionStorage: SessionStorageService;

    constructor(private http: HttpClient,
                private injector: Injector,
                @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.$localStorage = this.injector.get(LocalStorageService);
        this.$sessionStorage = this.injector.get(SessionStorageService);
    }

    getToken() {
        return this.$localStorage.get('authenticationToken') || this.$sessionStorage.get('authenticationToken');
    }

    getAuthorizationToken() {
        return 'Bearer ' + this.getToken();
    }

    login(credentials: any): Observable<any> {
        const data = {
            username: credentials.username,
            password: credentials.password,
            rememberMe: credentials.rememberMe
        };
        return this.http
            .post<any>(this.serverUrl.SERVER_API_URL + 'api/authenticate', data)
            .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.$localStorage.remove('authenticationToken');
            this.$sessionStorage.remove('authenticationToken');
            observer.complete();
        });
    }

    private authenticateSuccess(response: any, rememberMe: boolean): void {
        const jwt = response.id_token;
        if (rememberMe) {
            this.$localStorage.set('authenticationToken', jwt);
        } else {
            this.$sessionStorage.set('authenticationToken', jwt);
        }
    }
}

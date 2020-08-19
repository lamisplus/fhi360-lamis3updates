import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LocalStorageService, SessionStorageService } from 'ngx-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateStorageService } from '../core/auth/state-storage.service';
import { LoginService } from './login.service';

@Injectable()
export class LoginAuthenticationService {

    constructor(private router: Router,
                private loginService: LoginService,
                private $localStorage: LocalStorageService,
                private $sessionStorage: SessionStorageService,
                private eventManager: JhiEventManager,
                private stateStorageService: StateStorageService) {
    }

    setRedirect(value: any) {

    }

    isEcmLoggedIn() {
        return false;
    }

    isBpmLoggedIn() {
        return false;
    }

    isOauth() {
        return false;
    }

    getRedirect() {
        return null;
    }

    login(username: string, password: string, rememberMe: boolean = false): Observable<any> {
        return this.loginService.login({
            username: username,
            password: password,
            rememberMe: rememberMe
        }).pipe(
            map(
                () => {
                    if (this.router.url === '/account/register' || this.router.url.startsWith('/account/activate') ||
                        this.router.url.startsWith('/account/reset/')) {
                        this.router.navigate(['']);
                    }

                    this.eventManager.broadcast({
                        name: 'authenticationSuccess',
                        content: 'Sending Authentication Success'
                    });

                    // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // since login is successful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl('');
                        this.router.navigate([redirect]);
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                }
            )
        );
    }
}

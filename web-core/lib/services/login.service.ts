import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AccountService } from '../core/auth/account.service';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class LoginService {
	constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider,
				private router: Router) {
	}

	login(credentials): Observable<Account | null> {
		return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
	}

	logout() {
		this.authServerProvider.logout().subscribe();
		this.accountService.authenticate(null);
		this.router.navigateByUrl('/sessions/login')
	}
}

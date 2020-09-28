import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
	BreakpointObserver,
	Breakpoints,
	BreakpointState,
} from '@angular/cdk/layout';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	isUserLoggedIn: Observable<boolean>;
	isAdmin: Observable<boolean>;
	userName = '';
	isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
		Breakpoints.Handset,
	);

	constructor(
		private breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService,
	) {
		this.isUserLoggedIn = authService.isUserLoggedIn();
		const user = localStorage.getItem('currentUser');
		this.userName = user ? JSON.parse(user).firstName : '';
	}

	onLogout() {
		this.authService.logout();
	}
}

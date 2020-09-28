import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { ErrorComponent } from '../error/component';

@Component({
	selector: 'app-login',
	templateUrl: './component.html',
	styleUrls: ['./component.css'],
})
export class LoginPageComponent implements OnInit {
	public username = '';
	public password = '';
	// public errorDialogRef: MatDialogRef<ErrorComponent>;

	constructor(private dialog: MatDialog, private router: Router) {}

	ngOnInit() {}
	login() {
		if (this.username === 'demo' && this.password === 'demo') {
			this.router.navigate(['customer-list']);
		} else {
			this.dialog.open(ErrorComponent, {
				data: {
					message: 'Your login information are incorrect!',
				},
			});
		}
	}
}

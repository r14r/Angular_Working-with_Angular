import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-footer',
	templateUrl: './component.html',
	styleUrls: ['./component.scss'],
})
export class AppFooterComponent implements OnInit {
	constructor(
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar,
	) {}

	ngOnInit() {}
}

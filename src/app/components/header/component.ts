import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
	selector: 'app-header',
	templateUrl: './component.html',
	styleUrls: ['./component.scss'],
})
export class AppHeaderComponent implements OnInit {
	constructor(
		private helper: HelperService,
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar,
	) {
		this.helper.log('constructor');
	}

	ngOnInit() {}
}

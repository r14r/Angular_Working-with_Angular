import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './component.html',
	styleUrls: ['./component.css'],
})
export class MaterialFormDemoPageComponent implements OnInit {
	constructor(private dialog: MatDialog, private router: Router) {}

	ngOnInit() {}
}

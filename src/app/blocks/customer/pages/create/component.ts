import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-customer-create',
	templateUrl: './component.html',
	styleUrls: ['./component.css'],
})
export class CustomerCreateComponent implements OnInit {
	name = '';
	email = '';
	job = '';
	address = '';
	selectedSource = 'email';
	selectedGender = 'male';
	isCompany = false;
	createdAt = new FormControl(new Date());

	constructor() {}
	public createCustomer() {}
	ngOnInit() {}
}

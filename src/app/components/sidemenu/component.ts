import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-sidemenu',
	templateUrl: './component.html',
	styleUrls: ['./component.scss'],
})
export class AppSidemenuComponent implements OnInit {
	constructor(route: ActivatedRoute) {
		route.params.subscribe(params =>
			console.log('side menu id parameter', params['id']),
		);
	}

	ngOnInit() {}
}

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HelperService {
	m = 'HelperService';

	constructor() {}

	init(module: string) {
		this.m = module;
	}

	log(func, line: string = '') {
		console.log(this.m + '::' + func + '|' + line);
	}
}

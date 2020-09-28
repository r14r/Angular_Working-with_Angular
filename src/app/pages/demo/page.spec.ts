import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPageComponent } from './page';

describe('DemoPageComponent', () => {
	let component: DemoPageComponent;
	let fixture: ComponentFixture<DemoPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DemoPageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DemoPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

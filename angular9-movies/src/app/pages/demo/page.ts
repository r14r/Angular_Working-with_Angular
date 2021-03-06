import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DemoDialogContentComponent } from './dialog/dialog';

@Component({
	selector: 'app-demo-page',
	templateUrl: './page.html',
	styleUrls: ['./page.scss'],
})
export class DemoDemoPageComponent implements OnInit {
	isDarkTheme = false;
	lastDialogResult: string;
	mode: string;
	value: number;

	foods: any[] = [
		{ name: 'Pizza', rating: 'Excellent' },
		{ name: 'Burritos', rating: 'Great' },
		{ name: 'French fries', rating: 'Pretty good' },
	];

	public selectedValue: string;

	public games = [
		{ value: 'rts-0', viewValue: 'Starcraft' },
		{ value: 'rpg-1', viewValue: "Baldur's Gate" },
		{ value: 'fps-2', viewValue: 'Doom' },
	];

	public progress = 0;
	public slider = {
		autoTicks: false,
		disabled: false,
		invert: false,
		max: 100,
		min: 0,
		showTicks: false,
		step: 1,
		thumbLabel: false,
		value: 0,
		vertical: false,
		tickInterval: 1,
		checked: true,
	};
	public tiles = [
		{ text: 'One', cols: 3, rows: 1, color: 'lightblue' },
		{ text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
		{ text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
		{ text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
	];

	public color: string;

	public availableColors = [
		{ name: 'none', color: '' },
		{ name: 'Primary', color: 'primary' },
		{ name: 'Accent', color: 'accent' },
		{ name: 'Warn', color: 'warn' },
	];

	constructor(
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar,
	) {
		// Update the value for the progress-bar on an interval.
		setInterval(() => {
			this.progress =
				(this.progress + Math.floor(Math.random() * 4) + 1) % 100;
		}, 200);
	}

	ngOnInit() {}

	openDialog() {
		const dialogRef = this.matDialog.open(DemoDialogContentComponent);

		dialogRef.afterClosed().subscribe(result => {
			this.lastDialogResult = result;
		});
	}

	showSnackbar() {
		this.matSnackbar.open('YUM SNACKS', 'CHEW');
	}
	get tickInterval(): number | 'auto' {
		return this.slider.showTicks
			? this.slider.autoTicks
				? 'auto'
				: this.slider.tickInterval
			: null;
	}
	set tickInterval(v) {
		this.slider.tickInterval = Number(v);
	}
}

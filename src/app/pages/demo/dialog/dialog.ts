import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	templateUrl: './dialog.html',
	styleUrls: ['./dialog.scss'],
})
export class DialogContentComponent {
	constructor(
		@Optional() public dialogRef: MatDialogRef<DialogContentComponent>,
	) {}
}

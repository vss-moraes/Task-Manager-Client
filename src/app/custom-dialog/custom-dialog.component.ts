import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-custom-dialog',
  styleUrls: ['./custom-dialog.component.css'],
  templateUrl: './custom-dialog.component.html',
})

export class CustomDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<CustomDialog>) { }

}
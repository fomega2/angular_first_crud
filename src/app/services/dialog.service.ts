import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

export class DialogService{
    constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}, public dialog: MatDialog) { }
    openDialog() {
        this.dialog.open(DialogComponent, {
          data: {
            msg: 'panda',
          }, 
        });
      }
}
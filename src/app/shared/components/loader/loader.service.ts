import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './loader.component';

@Injectable()
export class LoaderService {

  dialogRef!: MatDialogRef<LoaderComponent>;

  constructor(private dialog: MatDialog) { }

  show() {
    this.dialogRef = this.dialog.open(LoaderComponent, { disableClose: true, hasBackdrop: true });
    return this.dialogRef.afterClosed();
  }

  hide() {
    this.dialogRef?.close();
  }

}

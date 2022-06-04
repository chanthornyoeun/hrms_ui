import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dependent } from 'src/app/models/dependent';
import { DependentDialogComponent } from '../dependent-dialog/dependent-dialog.component';

@Injectable()
export class DependentDialogService {

  constructor(private dialog: MatDialog) { }

  open(dependent?: Dependent) {
    const dialogRef = this.dialog.open(DependentDialogComponent, {
      width: '1000px',
      disableClose: true,
      data: dependent,
      autoFocus: false
    });
    return dialogRef.afterClosed();
  }

}

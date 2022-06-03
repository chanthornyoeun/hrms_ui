import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Education } from 'src/app/models/education';
import { EducationDialogComponent } from '../education-dialog/education-dialog.component';

@Injectable()
export class EducationDialogService {

  constructor(private dialog: MatDialog) { }

  open(education?: Education) {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: education
    });
    return dialogRef.afterClosed();
  }

}

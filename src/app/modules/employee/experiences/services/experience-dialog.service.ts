import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Experience } from 'src/app/models/experience';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';

@Injectable()
export class ExperienceDialogService {

  constructor(private dialog: MatDialog) { }

  open(experience?: Experience) {
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: experience
    });
    return dialogRef.afterClosed();
  }

}

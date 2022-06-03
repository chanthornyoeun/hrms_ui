import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TrainingDialogComponent } from "../training-dialog/training-dialog.component";
import { Training } from "../../../../models/training";

@Injectable()
export class TrainingDialogService {

  constructor(private dialog: MatDialog) { }

  open(training?: Training) {
    const dialogRef = this.dialog.open(TrainingDialogComponent, {
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: training
    });
    return dialogRef.afterClosed();
  }

}

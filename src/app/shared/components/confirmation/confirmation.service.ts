import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation.component';
import { Observable } from 'rxjs';
import { ConfirmationModel } from "./confirmation.model";

@Injectable()
export class ConfirmationService {

  dialogRef!: MatDialogRef<ConfirmationComponent>;

  constructor(private dialog: MatDialog) { }

  confirm(confirmation: ConfirmationModel): Observable<any> {
    this.dialogRef = this.dialog.open(ConfirmationComponent, { disableClose: true, hasBackdrop: true , data: confirmation});
    return this.dialogRef.afterClosed();
  }

}

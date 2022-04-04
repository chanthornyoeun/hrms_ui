import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class MessageService {

  constructor(private snackbar: MatSnackBar) { }

  show(message: string) {
    this.snackbar.open(message, 'Ok', { duration: 3000, horizontalPosition: 'left'});
  }

}

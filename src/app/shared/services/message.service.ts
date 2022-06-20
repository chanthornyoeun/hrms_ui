import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor(private snackbar: MatSnackBar, private responsiveService: ResponsiveService) { }

  show(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    };

    if (this.responsiveService.isSmall) {
      config.verticalPosition = 'bottom';
    }

    this.snackbar.open(message, 'Ok', config);
  }

}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { passwordMismatch } from '../../user-management/users/validators/custom-validator';

@Component({
  selector: 'app-reset-password-dailog',
  templateUrl: './reset-password-dailog.component.html',
  styleUrls: ['./reset-password-dailog.component.scss']
})
export class ResetPasswordDailogComponent {

  passwordform: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordDailogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.passwordform = this.fb.group({
      userId: [null],
      username: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMismatch(),
    });

    if (this.data) {
      this.passwordform.patchValue(this.data);
    }
  }

  submit() {
    this.loaderService.show();
    this.userService.resetPassword(this.passwordform.value)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.messageService.show('Password has been changed.');
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

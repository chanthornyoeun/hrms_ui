import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailService } from "../../../../services/email.service";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { MessageService } from "../../../../shared/services/message.service";

@Component({
  selector: 'app-email-tester',
  templateUrl: './email-tester.component.html',
  styleUrls: ['./email-tester.component.scss']
})
export class EmailTesterComponent {

  testForm: FormGroup = this.fb.group({
    to: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    content: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<EmailTesterComponent>,
    private fb: FormBuilder,
    private emailService: EmailService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) { }

  sendMail() {
    if(this.testForm.invalid) {
      this.messageService.show('Please enter required fields');
      return;
    }
    this.loaderService.show();
    this.emailService.sendMail(this.testForm.value)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.messageService.show('Successfully sent!');
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

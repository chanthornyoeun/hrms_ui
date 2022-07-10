import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailService } from "../../../../services/email.service";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { MessageService } from "../../../../shared/services/message.service";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-email-tester',
  templateUrl: './email-tester.component.html',
  styleUrls: ['./email-tester.component.scss']
})
export class EmailTesterComponent {

  testForm: FormGroup = this.fb.group({
    to: this.fb.array([]),
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
    if (this.testForm.invalid) {
      this.messageService.show('Please enter required fields');
      return;
    }
    this.loaderService.show();
    this.emailService.sendMail(this.testForm.value)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.messageService.show('Successfully sent!');
      });
  }

  get recipients(): FormArray {
    return this.testForm.get('to') as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;
    const control = this.fb.control('', Validators.email);
    control.setValue(value);
    if (control.invalid) {
      this.messageService.show('Invalid email format.');
      return;
    }
    this.recipients.push(control);
    event.chipInput!.clear();
  }

  remove(index: number) {
    this.recipients.removeAt(index);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

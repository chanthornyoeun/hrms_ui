import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailService } from "../../../services/email.service";
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { EmailConfigure } from "../../../models/email-configure";
import { MessageService } from "../../../shared/services/message.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EmailTesterComponent } from "./email-tester/email-tester.component";

@Component({
  selector: 'app-email-configure',
  templateUrl: './email-configure.component.html',
  styleUrls: ['./email-configure.component.scss']
})
export class EmailConfigureComponent implements OnInit {

  emailForm!: FormGroup;
  encryptions: string[] = ['SSL', 'TLS'];
  previousConfig!: EmailConfigure;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadEmailConfig();
  }

  private buildForm() {
    this.emailForm = this.fb.group({
      driver: 'SMTP',
      host: ['', Validators.required],
      port: [null, Validators.required],
      encryption: ['SSL', Validators.required],
      fromAddress: ['', Validators.required],
      fromName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private loadEmailConfig() {
    this.loaderService.show();
    this.emailService.loadConfig()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        delete res.data.currentAccount;
        const config = res.data;
        this.previousConfig = config;
        this.emailForm.patchValue(config)
      });
  }

  openMailTestingForm() {
    const dialogRef: MatDialogRef<EmailTesterComponent> = this.dialog.open(EmailTesterComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  updateConfig() {
    this.loaderService.show();
    this.emailService.updateConfig(this.emailForm.value)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        delete res.data.currentAccount;
        this.previousConfig = res.data;
        this.messageService.show('Configuration has been updated successfully.');
      })
  }

}

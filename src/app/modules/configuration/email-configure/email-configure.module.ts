import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmtpConfigureRoutingModule } from './smtp-configure-routing.module';
import { EmailConfigureComponent } from './email-configure.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailTesterComponent } from './email-tester/email-tester.component';
import { SharedModule } from '../../../shared/shared.module';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    EmailConfigureComponent,
    EmailTesterComponent
  ],
  imports: [
    CommonModule,
    SmtpConfigureRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class EmailConfigureModule { }

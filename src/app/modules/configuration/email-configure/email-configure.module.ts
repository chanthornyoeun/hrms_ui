import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmtpConfigureRoutingModule } from './smtp-configure-routing.module';
import { EmailConfigureComponent } from './email-configure.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailTesterComponent } from './email-tester/email-tester.component';
import { SharedModule } from '../../../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';


@NgModule({
  declarations: [
    EmailConfigureComponent,
    EmailTesterComponent
  ],
  imports: [
    CommonModule,
    SmtpConfigureRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialCompModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ]
})
export class EmailConfigureModule { }

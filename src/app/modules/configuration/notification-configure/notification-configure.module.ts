import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationConfigureRoutingModule } from './notification-configure-routing.module';
import { NotificationConfigureComponent } from './notification-configure.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NotificationConfigureComponent
  ],
  imports: [
    CommonModule,
    NotificationConfigureRoutingModule,
    MatIconModule
  ]
})
export class NotificationConfigureModule { }

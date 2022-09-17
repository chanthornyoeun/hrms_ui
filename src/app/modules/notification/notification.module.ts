import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    NotificationComponent,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    MaterialCompModule,
    ComponentsModule,
    InfiniteScrollModule,
    ScrollingModule,
  ]
})
export class NotificationModule { }

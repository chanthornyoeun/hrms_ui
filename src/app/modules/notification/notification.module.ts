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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotificationSkeletonComponent } from './notification-skeleton/notification-skeleton.component';



@NgModule({
  declarations: [
    NotificationComponent,
    NotificationItemComponent,
    NotificationSkeletonComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    MaterialCompModule,
    ComponentsModule,
    InfiniteScrollModule,
    ScrollingModule,
    NgxSkeletonLoaderModule,
  ]
})
export class NotificationModule { }

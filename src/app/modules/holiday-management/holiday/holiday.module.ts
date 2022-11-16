import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayRoutingModule } from './holiday-routing.module';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DATEPICKER_PROVIDER } from "../../../config";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { AnnouncementComponent } from './announcement/announcement.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    HolidayFormComponent,
    HolidayListComponent,
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    MaterialCompModule,
    HolidayRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    DATEPICKER_PROVIDER,
    PaginationHistoryService
  ]
})
export class HolidayModule { }

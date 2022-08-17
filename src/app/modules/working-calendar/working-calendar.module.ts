import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingCalendarRoutingModule } from './working-calendar-routing.module';
import { WorkingCalendarFormComponent } from './working-calendar-form/working-calendar-form.component';
import { WorkingCalendarListComponent } from './working-calendar-list/working-calendar-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkingPipe } from './working.pipe';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { MaterialCompModule } from '../../shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    WorkingCalendarFormComponent,
    WorkingCalendarListComponent,
    WorkingPipe
  ],
  imports: [
    CommonModule,
    WorkingCalendarRoutingModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    SharedModule,
    MaterialCompModule,
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class WorkingCalendarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingCalendarRoutingModule } from './working-calendar-routing.module';
import { WorkingCalendarFormComponent } from './working-calendar-form/working-calendar-form.component';
import { WorkingCalendarListComponent } from './working-calendar-list/working-calendar-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkingPipe } from './working.pipe';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker'; 
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';


@NgModule({
  declarations: [
    WorkingCalendarFormComponent,
    WorkingCalendarListComponent,
    WorkingPipe
  ],
  imports: [
    CommonModule,
    WorkingCalendarRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    SharedModule
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class WorkingCalendarModule { }

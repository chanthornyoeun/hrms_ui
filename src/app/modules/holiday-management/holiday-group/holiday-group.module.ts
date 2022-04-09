import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayGroupRoutingModule } from './holiday-group-routing.module';
import { HolidayGroupListComponent } from './holiday-group-list/holiday-group-list.component';
import { HolidayGroupFormComponent } from './holiday-group-form/holiday-group-form.component';
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


@NgModule({
  declarations: [
    HolidayGroupListComponent,
    HolidayGroupFormComponent
  ],
  imports: [
    CommonModule,
    HolidayGroupRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HolidayGroupModule { }

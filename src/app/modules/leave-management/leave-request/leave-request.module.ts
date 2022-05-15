import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../../shared/shared.module";
import { LeaveRequestFormComponent } from './leave-reqeust-form/leave-request-form.component';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { LeaveRequestFilterComponent } from './leave-reqeust-filter/leave-request-filter.component';


@NgModule({
  declarations: [
    LeaveRequestListComponent,
    LeaveRequestFormComponent,
    LeaveRequestFilterComponent
  ],
  imports: [
    CommonModule,
    LeaveRequestRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatRadioModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class LeaveRequestModule { }

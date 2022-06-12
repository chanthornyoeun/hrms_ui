import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyAttendantRoutingModule } from './daily-attendant-routing.module';
import { DailyAttendantComponent } from './daily-attendant.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../shared/shared.module";
import { PaginationHistoryService } from "../../services/pagination-history.service";


@NgModule({
  declarations: [
    DailyAttendantComponent
  ],
  imports: [
    CommonModule,
    DailyAttendantRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class DailyAttendantModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { LeaveRequestFormComponent } from './leave-reqeust-form/leave-request-form.component';

import { LeaveRequestFilterComponent } from './leave-reqeust-filter/leave-request-filter.component';
import { DATEPICKER_PROVIDER } from "../../../config";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { AvailableLeavePipe } from './available-leave.pipe';
import { LeaveRequestViewComponent } from './leave-request-view/leave-request-view.component';
import { PendingLeavesComponent } from './pending-leaves/pending-leaves.component';
import { SelectCompsModule } from 'src/app/shared/select-comps/select-comps.module';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    LeaveRequestListComponent,
    LeaveRequestFormComponent,
    LeaveRequestFilterComponent,
    AvailableLeavePipe,
    LeaveRequestViewComponent,
    PendingLeavesComponent
  ],
  imports: [
    CommonModule,
    LeaveRequestRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SelectCompsModule,
    MaterialCompModule
  ],
  providers: [
    DatePipe,
    DATEPICKER_PROVIDER,
    PaginationHistoryService
  ]
})
export class LeaveRequestModule { }

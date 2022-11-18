import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { SelectCompsModule } from 'src/app/shared/select-comps/select-comps.module';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    LeaveRequestListComponent,
    LeaveRequestFormComponent,
    LeaveRequestFilterComponent,
    AvailableLeavePipe,
    LeaveRequestViewComponent,
    LeaveRequestsComponent
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
    DATEPICKER_PROVIDER,
    PaginationHistoryService
  ]
})
export class LeaveRequestModule { }

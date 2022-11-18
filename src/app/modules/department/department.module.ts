import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { PositionsComponent } from './positions/positions.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { PositionDialogComponent } from './position-dialog/position-dialog.component';
import { SelectCompsModule } from 'src/app/shared/select-comps/select-comps.module';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent,
    PositionsComponent,
    PositionDialogComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialCompModule,
    SelectCompsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class DepartmentModule { }

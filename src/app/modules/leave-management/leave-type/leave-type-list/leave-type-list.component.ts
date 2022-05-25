import { Component, ViewChild } from '@angular/core';
import { LeaveType } from 'src/app/models/leave-type';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.scss']
})
export class LeaveTypeListComponent extends Pagination<LeaveType> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Type', field: 'type' },
      { headerText: 'Allowance Days', field: 'allowanceDay' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'dateFormat' },
      { headerText: 'Description', field: 'description', format: 'excerpt' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private leaveTypeService: LeaveTypeService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(leaveTypeService, loaderService, pg);
  }

}

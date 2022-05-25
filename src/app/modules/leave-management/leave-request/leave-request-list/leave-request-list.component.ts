import { Component, ViewChild } from '@angular/core';
import { ColumnConfig, DataGridComponent } from "../../../../shared/components/data-grid/data-grid.component";
import { Pagination } from "../../../../shared/components/data-grid/pagination";
import { LeaveRequestService } from "../../../../services/leave-request.service";
import { LeaveRequestFilter } from "../leave-reqeust-filter/leave-request-filter";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { Searchable } from 'src/app/shared/components/data-grid/searchable';
import { LeaveRequst } from 'src/app/models/leave-requst';

@Component({
  selector: 'app-leave-request-list',
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.scss']
})
export class LeaveRequestListComponent extends Pagination<LeaveRequst> implements Searchable {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Type of Leave', field: 'leaveTypeId', renderer: record => record.leaveType.type },
      { headerText: 'Employee', field: 'employeeId', renderer: record => record.employee.firstName + ' ' + record.employee.lastName },
      { headerText: 'Applied On', field: 'createdAt', format: 'dateTimeFormat' },
      { headerText: 'From Date', field: 'fromDate', format: 'dateFormat' },
      { headerText: 'To Date', field: 'toDate', format: 'dateFormat' },
      { headerText: 'Day(s)', field: 'day' },
      { headerText: 'Status', field: 'status' },
      { headerText: 'Reason', field: 'reason' },
      { headerText: 'Comment', field: 'comment' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'visibility', link: 'view/', tooltip: 'View' }
    ]
  }

  constructor(
    private leaveRequestService: LeaveRequestService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(leaveRequestService, loaderService, pg);
  }

  search($event: LeaveRequestFilter) {
    this.pg.updateQueryParams($event);
    this.pg.setPreviousPagination({ ...this.pagination });
    this.pagination.pageIndex = 0;
    this.pagination.offset = 0;
    this.list(this.pagination, ParamsBuilder.build($event));
  }

  clear() {
    this.pg.updateQueryParams({});
    this.pagination = this.pg.getPreviousPagination();
    this.list(this.pagination);
  }

}

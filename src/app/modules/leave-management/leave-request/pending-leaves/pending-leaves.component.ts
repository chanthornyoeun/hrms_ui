import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LeaveStatusEnum } from 'src/app/enums/leave-status.enum';
import { LeaveRequst } from 'src/app/models/leave-requst';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.scss']
})
export class PendingLeavesComponent extends Pagination<LeaveRequst> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;
  employeeCtl: FormControl = new FormControl('All');

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'No.', field: 'id', format: 'autonumber' },
      { headerText: 'Type of Leave', field: 'leaveTypeId', renderer: record => record.leaveType.type },
      { headerText: 'Employee', field: 'employeeId', renderer: record => record.employee.firstName + ' ' + record.employee.lastName },
      { headerText: 'Applied On', field: 'createdAt', format: 'dateTimeFormat' },
      { headerText: 'From Date', field: 'fromDate', format: 'dateFormat' },
      { headerText: 'To Date', field: 'toDate', format: 'dateFormat' },
      { headerText: 'Day(s)', field: 'day' },
      { headerText: 'Status', field: 'status' },
      { headerText: 'Reason', field: 'reason', format: 'excerpt' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'visibility', link: '/leave-request/view/', tooltip: 'View' }
    ]
  }

  constructor(
    private leaveRequestService: LeaveRequestService,
    protected ld: LoaderService,
    private pg: PaginationHistoryService,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    super(leaveRequestService, ld, pg, true);
  }

  ngOnInit(): void {
    this.getPendingLeaves();
    this.selectedEmployee();
  }

  private selectedEmployee() {
    this.employeeCtl.valueChanges.subscribe(value => {
      const employeeId = value == 'All' ? null : value;
      this.getPendingLeaves(employeeId);
    });
  }

  private getPendingLeaves(employeeId?: number) {
    const queryParams = { status: LeaveStatusEnum.PENDING, employeeId };
    this.paginationHistoryService.updateQueryParams(queryParams)
    this.list(this.pagination, ParamsBuilder.build(queryParams));
  }

}

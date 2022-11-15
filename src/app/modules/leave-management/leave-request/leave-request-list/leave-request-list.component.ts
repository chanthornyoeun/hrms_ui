import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnConfig, DataGridComponent } from "../../../../shared/components/data-grid/data-grid.component";
import { Pagination } from "../../../../shared/components/data-grid/pagination";
import { LeaveRequestService } from "../../../../services/leave-request.service";
import { LeaveRequestFilter } from "../leave-reqeust-filter/leave-request-filter";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { Searchable } from 'src/app/shared/components/data-grid/searchable';
import { Employee, LeaveRequst } from 'src/app/models/leave-requst';
import { ActivatedRoute } from "@angular/router";
import { LeaveConfiguration } from "../models/leave-configuration";
import { EmployeeService } from 'src/app/services/employee.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-leave-request-list',
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.scss']
})
export class LeaveRequestListComponent extends Pagination<LeaveRequst> implements Searchable, OnInit {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;
  configuration: LeaveConfiguration = {};
  breadcrumb: string = '';
  roles: string[] = [];
  isHRUser: boolean | undefined = false;
  currentEmp!: Employee;
  invokedOnce: boolean = false;

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
      { headerText: 'Comment', field: 'comment', format: 'excerpt' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'visibility', link: 'view/', tooltip: 'View' }
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
    this.activatedRoute.data
      .subscribe((data: any) => {
        this.configuration = data.params as LeaveConfiguration;
        this.breadcrumb = data.breadcrumb;
        if (this.configuration.selfLeave) {
          this.removeEmployeeColumn();
        }
      });
  }

  private getCurrentUserRoles() {
    return this.employeeService.getCurrentEmployee().pipe(
      map(res => {
        this.invokedOnce = true;
        this.currentEmp = res.data['employee'];
        this.roles = (res.data['roles'] as Array<any>).map(role => role['roleName']);
        return this.roles.includes('HR') || this.roles.includes('ADMIN');
      })
    ).toPromise();
  }

  async search($event: LeaveRequestFilter) {
    if (!this.invokedOnce) {
      this.isHRUser = await this.getCurrentUserRoles();
    }

    let queryParams = { ...$event };
    if (!this.isHRUser) {
      queryParams = { ...$event, ...this.configuration };
    }
    this.pg.updateQueryParams(queryParams);
    this.pg.setPreviousPagination({ ...this.pagination });
    this.pagination.pageIndex = 0;
    this.pagination.offset = 0;
    this.list(this.pagination, ParamsBuilder.build(queryParams));
  }

  clear() {
    this.pg.updateQueryParams({});
    this.pagination = this.pg.getPreviousPagination();
    this.list(this.pagination, ParamsBuilder.build(this.configuration));
  }

  private removeEmployeeColumn() {
    this.config.columnDefs.splice(2, 1);
  }

}

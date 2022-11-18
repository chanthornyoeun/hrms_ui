import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { LeaveStatusEnum } from 'src/app/enums/leave-status.enum';
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';
import { LeaveRequst } from 'src/app/models/leave-requst';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { PaginationHistory, PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss']
})
export class LeaveRequestsComponent extends Pagination<LeaveRequst> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;
  status: LeaveStatusEnum;
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Dashboard',
    link: '/dashboard',
    page: ''
  };

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
    private activatedRoute: ActivatedRoute
  ) {
    super(leaveRequestService, ld, pg, true);
    this.status = this.activatedRoute.snapshot.paramMap.get('status') as LeaveStatusEnum;
  }

  ngOnInit(): void {
    this.list(this.pagination);
  }

  override list(pagination: PaginationHistory, params: HttpParams = new HttpParams): void {
    params = params.set('offset', pagination.offset).set('limit', pagination.pageSize);
    this.loaderService.show();
    this.getLeaveRequest(this.status, params)?.pipe(
      finalize(() => this.loaderService.hide())
    ).subscribe((res: any) => {
      this.data = res.data;
      this.total = res.total;
      this.grid.updatePagination(this.pagination);
    });
  };

  private getLeaveRequest(status: LeaveStatusEnum, params: HttpParams) {
    if (status.toLowerCase() === LeaveStatusEnum.APPROVE.toLowerCase()) {
      this.breadcrumbConfig.page = 'Today Leaves'
      return this.leaveRequestService.getTodayLeaves(params);
    }

    if (status.toLowerCase() === LeaveStatusEnum.PENDING.toLowerCase()) {
      this.breadcrumbConfig.page = 'Pending Leaves'
      return this.leaveRequestService.getPendingLeaves(params);
    }

    return null;
  }

}

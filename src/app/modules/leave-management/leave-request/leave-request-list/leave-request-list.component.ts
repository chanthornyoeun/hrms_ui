import { Component, OnInit } from '@angular/core';
import { ColumnConfig } from "../../../../shared/components/data-grid/data-grid.component";
import { HttpParams } from "@angular/common/http";
import { Pagination } from "../../../../shared/components/data-grid/pagination";
import { Observable, map } from "rxjs";
import { LeaveRequestService } from "../../../../services/leave-request.service";
import { LeaveRequst } from "../../../../models/leave-requst";
import {LeaveRequestFilter} from "../leave-reqeust-filter/leave-request-filter";
import {ParamsBuilder} from "../../../../utilities/params-builder";

@Component({
  selector: 'app-leave-request-list',
  templateUrl: './leave-request-list.component.html',
  styleUrls: ['./leave-request-list.component.scss']
})
export class LeaveRequestListComponent extends Pagination implements OnInit {

  leaveRequest$!: Observable<LeaveRequst[]>;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Type', field: 'leaveTypeId', renderer: record => record.leaveType.type },
      { headerText: 'Applied On', field: 'createdAt', format: 'date' },
      { headerText: 'From Date', field: 'fromDate', format: 'date' },
      { headerText: 'To Date', field: 'toDate', format: 'date' },
      { headerText: 'Day(s)', field: 'day' },
      { headerText: 'Status', field: 'status' },
      { headerText: 'Reason', field: 'reason' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'visibility', link: 'view/', tooltip: 'View' }
    ]
  }

  constructor(private leaveRequestService: LeaveRequestService) {
    super();
    this.list(this.params);
  }

  ngOnInit(): void {
  }

  list(params?: HttpParams): void {
    this.leaveRequest$ = this.leaveRequestService.list({ params })
      .pipe(map(res => {
        this.total = res.total;
        return res.data as LeaveRequst[];
      }));
  }

  handleSearch($event: LeaveRequestFilter) {
    const params: HttpParams = ParamsBuilder.build($event);
    this.list(params);
  }

}

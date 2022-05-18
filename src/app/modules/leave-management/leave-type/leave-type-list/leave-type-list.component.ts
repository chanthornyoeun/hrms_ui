import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LeaveType } from 'src/app/models/leave-type';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-leave-type-list',
  templateUrl: './leave-type-list.component.html',
  styleUrls: ['./leave-type-list.component.scss']
})
export class LeaveTypeListComponent extends Pagination {

  leaveType$!: Observable<LeaveType[]>;

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
    private loaderService: LoaderService
  ) {
    super();
    this.list(this.params);
  }

  list(params?: HttpParams): void {
    this.loaderService.show();
    this.leaveType$ = this.leaveTypeService.list({ params }).pipe(
      finalize(() => this.loaderService.hide()),
      map(res => {
        this.total = res.total;
        return res.data as LeaveType[];
      })
    );
  }

}

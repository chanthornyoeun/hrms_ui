import { Component, ViewChild } from '@angular/core';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { UserService } from 'src/app/services/user.service';
import { DataGridComponent, ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends Pagination<any> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Employee', field: 'employee', renderer: user => `${user.employee?.firstName} ${user.employee?.lastName}` },
      { headerText: 'Username', field: 'username' },
      { headerText: 'Email', field: 'email' },
      { headerText: 'Lock', field: 'blocked', format: 'active' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private userService: UserService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(userService, loaderService, pg, true);
  }

  search(paramsObj: object) {
    this.paginationHistoryService.updateQueryParams(paramsObj);
    this.list(this.pagination, ParamsBuilder.build(paramsObj));
  }

}

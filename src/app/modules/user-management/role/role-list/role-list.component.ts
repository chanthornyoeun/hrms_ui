import { Component, ViewChild } from '@angular/core';
import { Role } from 'src/app/models/role';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { RoleService } from 'src/app/services/role.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends Pagination<Role> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'dateFormat' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' },
      { icon: 'settings', link: 'apply-pages/', tooltip: 'Apply Pages' }
    ]
  }

  constructor(
    private positionService: RoleService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(positionService, loaderService, pg);
  }

}

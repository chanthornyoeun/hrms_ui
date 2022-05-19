import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends Pagination {

  role$!: Observable<Role[]>;
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
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private positionService: RoleService,
    private loaderService: LoaderService
  ) {
    super();
    this.list(this.params);
  }

  list(params?: HttpParams): void {
    this.loaderService.show();
    this.role$ = this.positionService.list({ params }).pipe(
      finalize(() => this.loaderService.hide()),
      map(res => {
        this.total = res.total;
        return res.data as Role[];
      })
    );
  }

}

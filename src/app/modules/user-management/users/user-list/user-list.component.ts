import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { User } from 'src/app/models/user';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { UserService } from 'src/app/services/user.service';
import { DataGridComponent, ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { RoleAssignmentComponent } from '../role-assignment/role-assignment.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends Pagination<any> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Employee', field: 'employee', renderer: user => `${user.employee?.firstName} ${user.employee?.lastName}` },
      { headerText: 'Username', field: 'username' },
      { headerText: 'Email', field: 'email' },
      { headerText: 'Roles', field: 'roles', renderer: user => user.roles.map((role: any) => role.roleName).join(', ') || 'N/A' },
      { headerText: 'Lock', field: 'blocked', format: 'active' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' },
      {
        icon: 'settings',
        tooltip: 'Assign Roles',
        click: (user: User) => this.assignRoles(user)
      }
    ]
  }

  constructor(
    private userService: UserService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService,
    private dialog: MatDialog
  ) {
    super(userService, loaderService, pg, true);
  }

  search(paramsObj: object) {
    this.paginationHistoryService.updateQueryParams(paramsObj);
    this.list(this.pagination, ParamsBuilder.build(paramsObj));
  }

  private assignRoles(user: User) {
    const dialogRef = this.dialog.open(RoleAssignmentComponent, {
      width: '700px',
      disableClose: true,
      autoFocus: false,
      data: user
    });
    dialogRef.afterClosed().subscribe((action: DialogAction) => {
      if (action === DialogAction.SAVE) {
        this.list(this.pagination);
      }
    });
  }

}

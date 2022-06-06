import { Component, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EmployeeSearch } from '../../employee-search-form/employee-search';
import { ColumnConfig, DataGridComponent } from "../../../../shared/components/data-grid/data-grid.component";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { Searchable } from 'src/app/shared/components/data-grid/searchable';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends Pagination<Employee> implements Searchable {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Gender', field: 'gender' },
      { headerText: 'Date of Birth', field: 'dateOfBirth', format: 'dateFormat' },
      { headerText: 'Department', field: 'departmentId', renderer: record => record.department?.name },
      { headerText: 'Position', field: 'positionId', renderer: record => record.position?.position },
      { headerText: 'Job Title', field: 'jobTitle' },
      { headerText: 'Joined Date', field: 'joinedDate', format: 'dateFormat' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Phone', field: 'phone' },
      { headerText: 'Email', field: 'email' },
      { headerText: 'Address', field: 'physicalAddress' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  };

  constructor(
    private employeeService: EmployeeService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(employeeService, loaderService, pg);
  }

  search($event: EmployeeSearch) {
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

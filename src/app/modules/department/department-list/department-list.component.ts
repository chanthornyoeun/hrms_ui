import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { Searchable } from 'src/app/shared/components/data-grid/searchable';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends Pagination<Department> implements OnInit, Searchable {

  searchForm = this.fb.group({ search: '' });
  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'No.', field: 'id', format: 'autonumber' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Manager', field: 'managerId', renderer: record => record.manager?.firstName + ' ' + record.manager?.lastName },
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
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(departmentService, loaderService, pg);
    this.searchForm.patchValue(this.pg.getQueryParams());
  }

  ngOnInit() {
    this.search();
  }

  search(queryParams?: object): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.paginationHistoryService.updateQueryParams(value);
      if (value.search) {
        this.paginationHistoryService.setPreviousPagination({ ...this.pagination });
        this.pagination.pageIndex = 0;
        this.pagination.offset = 0;
      } else {
        this.pagination = this.paginationHistoryService.getPreviousPagination();
      }
      this.list(this.pagination, ParamsBuilder.build(value));
    });
  }

}

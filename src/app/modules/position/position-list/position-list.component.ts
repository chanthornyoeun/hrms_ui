import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PositionService } from 'src/app/services/position.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { Searchable } from 'src/app/shared/components/data-grid/searchable';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent extends Pagination<Position> implements OnInit, Searchable {

  searchForm: FormGroup = this.fb.group({ search: '' });
  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'position' },
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
    private positionService: PositionService,
    protected override loaderService: LoaderService,
    protected pg: PaginationHistoryService
  ) {
    super(positionService, loaderService, pg);
    this.searchForm.patchValue(this.pg.getQueryParams());
  }

  ngOnInit(): void {
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

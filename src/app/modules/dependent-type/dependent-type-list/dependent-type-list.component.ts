import { Component, ViewChild } from '@angular/core';
import { DependentType } from 'src/app/models/dependent-type';
import { DependentTypeService } from 'src/app/services/dependent-type.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';

@Component({
  selector: 'app-dependent-type-list',
  templateUrl: './dependent-type-list.component.html',
  styleUrls: ['./dependent-type-list.component.scss']
})
export class DependentTypeListComponent extends Pagination<DependentType> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Short Description', field: 'shortDescription' },
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
    private dependentTypeService: DependentTypeService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(dependentTypeService, loaderService, pg);
  }

}

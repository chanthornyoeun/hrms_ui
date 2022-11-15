import { Component, ViewChild } from '@angular/core';
import { HolidayGroup } from 'src/app/models/holiday-group';
import { HolidayGroupService } from 'src/app/services/holiday-group.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';

@Component({
  selector: 'app-holiday-group-list',
  templateUrl: './holiday-group-list.component.html',
  styleUrls: ['./holiday-group-list.component.scss']
})
export class HolidayGroupListComponent extends Pagination<HolidayGroup> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'No.', field: 'id', format: 'autonumber' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Created Date', field: 'createdAt', format: 'dateFormat' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private holidayGroupService: HolidayGroupService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(holidayGroupService, loaderService, pg);
  }


}

import { Component, ViewChild } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { Holiday } from 'src/app/models/holiday';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent extends Pagination<Holiday> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Group', field: 'groupId', renderer: record => record.group?.name },
      { headerText: 'Date', field: 'holidayDate', format: 'dateFormat' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private holidayService: HolidayService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(holidayService, loaderService, pg);
  }

}

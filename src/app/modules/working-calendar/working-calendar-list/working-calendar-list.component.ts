import { Component, ViewChild } from '@angular/core';
import { WorkingCalendar } from 'src/app/models/working-calendar';
import { WorkingCalendarService } from 'src/app/services/working-calendar.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';

@Component({
  selector: 'app-working-calendar-list',
  templateUrl: './working-calendar-list.component.html',
  styleUrls: ['./working-calendar-list.component.scss']
})
export class WorkingCalendarListComponent extends Pagination<WorkingCalendar> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Department', field: 'departmentId', renderer: record => record.department?.name },
      { headerText: 'Day', field: 'day' },
      { headerText: 'Start Time', field: 'startTime' },
      { headerText: 'End Time', field: 'endTime' },
      { headerText: 'Working', field: 'isWorking', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'dateFormat' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private workingCalendarService: WorkingCalendarService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(workingCalendarService, loaderService, pg);
  }

}

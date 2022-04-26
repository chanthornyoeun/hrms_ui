import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WorkingCalendar } from 'src/app/models/working-calendar';
import { WorkingCalendarService } from 'src/app/services/working-calendar.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';

@Component({
  selector: 'app-working-calendar-list',
  templateUrl: './working-calendar-list.component.html',
  styleUrls: ['./working-calendar-list.component.scss']
})
export class WorkingCalendarListComponent extends Pagination {

  workingCalendar$!: Observable<WorkingCalendar[]>;
  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Department', field: 'departmentId' },
      { headerText: 'Day', field: 'day' },
      { headerText: 'Start Time', field: 'startTime' },
      { headerText: 'End Time', field: 'endTime' },
      { headerText: 'Working', field: 'isWorking', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'date' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(private workingCalendarService: WorkingCalendarService) {
    super();
    this.list(this.params);
  }

  list(params: HttpParams): void {
    this.workingCalendar$ = this.workingCalendarService.list({ params }).pipe(
      map(res => {
        this.total = res.total;
        return res.data as WorkingCalendar[];
      }));
  }

}
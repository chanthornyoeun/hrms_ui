import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
import { HolidayService } from 'src/app/services/holiday.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent extends Pagination {

  holiday$!: Observable<Holiday[]>;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Group', field: 'groupId' },
      { headerText: 'Date', field: 'holidayDate', format: 'date' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(private holidayService: HolidayService) {
    super();
    this.list(this.params);
  }

  list(params: HttpParams) {
    this.holiday$ = this.holidayService.list({ params }).pipe(map(res => {
      this.total = res.total;
      return res.data as Holiday[];
    }));
  }

}

import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HolidayGroup } from 'src/app/models/holiday-group';
import { HolidayGroupService } from 'src/app/services/holiday-group.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-holiday-group-list',
  templateUrl: './holiday-group-list.component.html',
  styleUrls: ['./holiday-group-list.component.scss']
})
export class HolidayGroupListComponent extends Pagination {

  holidayGroup$!: Observable<HolidayGroup[]>;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Created Date', field: 'createdAt', format: 'date' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private holidayGroupService: HolidayGroupService,
    private loaderService: LoaderService
  ) {
    super();
    this.list(this.params);
  }

  list(params: HttpParams) {
    this.loaderService.show();
    this.holidayGroup$ = this.holidayGroupService.list({ params }).pipe(
      finalize(() => this.loaderService.hide()),
      map(res => {
        this.total = res.total;
        return res.data as HolidayGroup[]
      })
    );
  }

}

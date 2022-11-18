import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkingCalendar } from 'src/app/models/working-calendar';
import { WorkingCalendarService } from 'src/app/services/working-calendar.service';
import { ColumnConfig, DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { ParamsBuilder } from '../../../utilities/params-builder';
import { HttpParams } from '@angular/common/http';
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';

@Component({
  selector: 'app-working-calendar-list',
  templateUrl: './working-calendar-list.component.html',
  styleUrls: ['./working-calendar-list.component.scss']
})
export class WorkingCalendarListComponent extends Pagination<WorkingCalendar> implements OnInit {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;
  departmentCtl: FormControl = new FormControl('All');
  department$!: Observable<Department[]>;
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Dashboard',
    link: '/dashboard',
    page: 'Working Hours'
  };

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'No.', field: 'id', format: 'autonumber' },
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
    private departmentService: DepartmentService,
    protected override loaderService: LoaderService,
    private pg: PaginationHistoryService
  ) {
    super(workingCalendarService, loaderService, pg);
    const queryParams: { [key: string]: any } = this.pg.getQueryParams();
    if (queryParams['departmentId']) {
      this.departmentCtl.setValue(queryParams['departmentId']);
    }
  }

  ngOnInit(): void {
    this.department$ = this.departmentService.list({ params: ParamsBuilder.build({ limit: 100 }) }).pipe(map(res => res.data));
    this.departmentChanged();
  }

  private departmentChanged() {
    this.departmentCtl.valueChanges.subscribe(departmentId => {
      this.paginationHistoryService.updateQueryParams({ departmentId });
      let params: HttpParams = new HttpParams();
      if (departmentId !== 'All') {
        params = ParamsBuilder.build({ departmentId });
        this.paginationHistoryService.setPreviousPagination({ ...this.pagination });
        this.pagination.pageIndex = 0;
        this.pagination.offset = 0;
      } else {
        this.paginationHistoryService.updateQueryParams({});
        this.pagination = this.paginationHistoryService.getPreviousPagination();
      }
      this.list(this.pagination, params);
    });
  }

}

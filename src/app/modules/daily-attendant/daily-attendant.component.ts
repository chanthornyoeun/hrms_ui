import { Component, ViewChild } from '@angular/core';
import { ColumnConfig, DataGridComponent } from "../../shared/components/data-grid/data-grid.component";
import { LoaderService } from "../../shared/components/loader/loader.service";
import { PaginationHistoryService } from "../../services/pagination-history.service";
import { Pagination } from "../../shared/components/data-grid/pagination";
import { AttendanceService } from "../../services/attendance.service";

@Component({
  selector: 'app-daily-attendant',
  templateUrl: './daily-attendant.component.html',
  styleUrls: ['./daily-attendant.component.scss']
})
export class DailyAttendantComponent extends Pagination<any> {

  @ViewChild(DataGridComponent) grid!: DataGridComponent;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Employee', field: 'employeeId', renderer: record => record.employee?.name },
      { headerText: 'Date', field: 'createdAt', format: 'dateFormat' },
      { headerText: 'Check-In Time', field: 'checkIn', format: 'timeFormat' },
      { headerText: 'Check-Out Time', field: 'checkOut', format: 'timeFormat' }
    ],
    rowActions: []
  }

  constructor(
    protected ls: LoaderService,
    private pg: PaginationHistoryService,
    private attendanceService: AttendanceService
  ) {
    super(attendanceService, ls, pg);
  }

  checkIn() {
    this.attendanceService.checkIn().subscribe(_ => this.list(this.pagination));
  }

  checkOut() {
    this.attendanceService.checkOut().subscribe(_ => this.list(this.pagination));
  }

}

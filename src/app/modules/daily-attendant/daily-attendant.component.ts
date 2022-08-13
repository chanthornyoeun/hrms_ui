import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from "../../shared/components/loader/loader.service";
import { AttendanceService } from "../../services/attendance.service";
import { Attendance } from 'src/app/models/attendance';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DateRange } from 'src/app/models/date-range';
import { DateUtil } from 'src/app/utilities/date-util';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { HttpParams } from '@angular/common/http';
import { PaginationHistory, PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ExportTypeEnum } from 'src/app/enums/export-type.enum';
import { saveAs } from 'file-saver';
import { DateFormatService } from 'src/app/services/date-format.service';


@Component({
  selector: 'app-daily-attendant',
  templateUrl: './daily-attendant.component.html',
  styleUrls: ['./daily-attendant.component.scss']
})
export class DailyAttendantComponent implements OnInit {

  attendances: Attendance[] = [];
  displayedColumns: string[] = [];
  selectedDate: Date = DateUtil.clearTime(new Date(new Date().setDate(1)));
  currentDate: Date = new Date();
  columnDefs: any[] = [];
  totalRecord: number = 0;
  defaultPageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100, 250, 500];
  employeeCtl: FormControl = new FormControl('');
  dateRange: DateRange = {
    fromDate: DateUtil.getFirstDayOfDate(this.selectedDate),
    toDate: DateUtil.getLastDayOfDate(this.selectedDate)
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private pagination: PaginationHistory;

  constructor(
    private attendanceService: AttendanceService,
    private loaderService: LoaderService,
    private dateFormatService: DateFormatService,
    private paginationService: PaginationHistoryService,
  ) {
    this.pagination = this.paginationService.getPagination();
    this.paginationService.updateQueryParams(this.dateRange);
    this.paginationService.setPagination(this.pagination);
    this.generateDisplayedColumn(new Date(this.selectedDate));
  }

  ngOnInit(): void {
    this.getAttendances(this.dateRange);
    this.employeeChange();
  }

  private getAttendances(dateRange: DateRange, params = new HttpParams()) {
    this.loaderService.show();
    this.attendanceService.getAttendantsAsCalendar(dateRange, params)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.attendances = res.data;
        this.totalRecord = res.total;
      });
  }

  checkIn() {
    this.attendanceService.checkIn().subscribe(_ => this.getAttendances(this.dateRange, this.getParams()));
  }

  checkOut() {
    this.attendanceService.checkOut().subscribe(_ => this.getAttendances(this.dateRange, this.getParams()));
  }

  private generateNumberOfDay(date: Date): string[] {
    let days: string[] = [];
    const dayInMonth: number = DateUtil.getDayInMonth(date);
    for (let i = 1; i <= dayInMonth; i++) {
      days.push(new Date(date.setDate(i)).toISOString());
    }
    return days;
  }

  private generateDisplayedColumn(date: Date) {
    this.columnDefs = this.generateNumberOfDay(date);
    this.displayedColumns = ['employee', ...this.columnDefs];
  }

  previousMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.updateTable(new Date(this.selectedDate));
  }

  monthSelected(date: Date) {
    this.updateTable(date);
  }

  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.updateTable(new Date(this.selectedDate));
  }

  private updateTable(date: Date) {
    this.selectedDate = date;
    this.generateDisplayedColumn(new Date(date));
    this.dateRange = {
      fromDate: DateUtil.getFirstDayOfDate(this.selectedDate),
      toDate: DateUtil.getLastDayOfDate(this.selectedDate)
    };
    this.getAttendances(this.dateRange, ParamsBuilder.build({ search: this.employeeCtl.value }));
    this.paginationService.updateQueryParams(this.dateRange);
  }

  private employeeChange() {
    this.employeeCtl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      let params: HttpParams;
      if (value) {
        params = ParamsBuilder.build({ search: value, limit: this.pagination.pageSize });
        this.paginator.pageIndex = 0;
      } else {
        this.paginationService.updateQueryParams({ search: value });
        this.pagination = this.paginationService.getPagination();
        this.paginator.pageIndex = this.pagination.pageIndex;
        params = this.getParams();
      }
      this.getAttendances(this.dateRange, params);
    });
  }

  exportExcel() {
    this.loaderService.show();
    const params: HttpParams = ParamsBuilder.build({ limit: this.totalRecord, search: this.employeeCtl.value });
    this.attendanceService.export(ExportTypeEnum.EXCEL, this.dateRange, params)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        const fileName = `attendant-in-${this.dateFormatService.format(this.selectedDate, 'MMM-yyyy')}.xlsx`;
        saveAs(res, fileName);
      });
  }

  nextPage($event: PageEvent) {
    this.pagination = {
      pageSize: $event.pageSize,
      offset: $event.pageSize * $event.pageIndex,
      pageIndex: $event.pageIndex
    };
    this.getAttendances(this.dateRange, this.getParams());
    this.paginationService.setPagination(this.pagination);
    this.paginationService.updateQueryParams({ search: this.employeeCtl.value });
  }

  private getParams(): HttpParams {
    return ParamsBuilder.build({ limit: this.pagination.pageSize, offset: this.pagination.offset, search: this.employeeCtl.value });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeaveTypeService } from "../../../../services/leave-type.service";
import { Observable, map } from "rxjs";
import { LeaveType } from "../../../../models/leave-type";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DateUtil } from "../../../../utilities/date-util";
import { LeaveRequestFilter } from "./leave-request-filter";
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe } from '@angular/common';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';

@Component({
  selector: 'app-leave-request-filter',
  templateUrl: './leave-request-filter.component.html',
  styleUrls: ['./leave-request-filter.component.scss']
})
export class LeaveRequestFilterComponent implements OnInit {

  leaveType$: Observable<LeaveType[]> = this.leaveTypeService.list().pipe(map(res => res.data));
  filterForm!: FormGroup;
  statuses: string[] = ['All', 'Pending', 'Approved', 'Rejected', 'Canceled'];
  employee$: Observable<Employee[]> = this.employeeService.list().pipe(map(res => res.data));

  @Input() selfLeave!: number;
  @Output() onSearch$: EventEmitter<LeaveRequestFilter> = new EventEmitter<LeaveRequestFilter>();
  @Output() onClear$: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private leaveTypeService: LeaveTypeService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private paginationHistoryService: PaginationHistoryService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    const params: {[key: string]: any} = this.paginationHistoryService.getQueryParams();
    if (params) {
      Object.keys(params).forEach((key: string) => {
        if (params.hasOwnProperty(key) && params[key] === null) {
          params[key] = 'All';
        }
      });
      this.filterForm.patchValue(params);
    }
  }

  private buildForm() {
    this.filterForm = this.fb.group({
      leaveTypeId: ['All'],
      fromDate: DateUtil.getFirstDayOfCurrentMonth(),
      toDate: DateUtil.getLastDayOfCurrentMonth(),
      status: 'All',
      employeeId: 'All'
    });
  }

  clear() {
    const defaultFilter: LeaveRequestFilter = {
      fromDate: DateUtil.getFirstDayOfCurrentMonth(),
      toDate: DateUtil.getLastDayOfCurrentMonth(),
      leaveTypeId: 'All',
      status: 'All',
      employeeId: 'All'
    }
    this.filterForm.reset(defaultFilter);
    this.onClear$.emit();
  }

  search() {
    const fromDate: Date = this.filterForm.get('fromDate')?.value;
    const toDate: Date = this.filterForm.get('toDate')?.value;
    const dateFormat: string = 'yyyy-MM-dd';
    const value = {
      fromDate: this.datePipe.transform(fromDate, dateFormat),
      toDate: this.datePipe.transform(toDate, dateFormat),
      leaveTypeId: this.filterForm.get('leaveTypeId')?.value === 'All' ? null : this.filterForm.get('leaveTypeId')?.value,
      status: this.filterForm.get('status')?.value === 'All' ? null : this.filterForm.get('status')?.value,
      employeeId: this.filterForm.get('employeeId')?.value === 'All' ? null : this.filterForm.get('employeeId')?.value
    }
    this.onSearch$.emit(value);
  }

}

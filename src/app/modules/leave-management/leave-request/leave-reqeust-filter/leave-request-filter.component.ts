import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LeaveTypeService } from "../../../../services/leave-type.service";
import { Observable, map } from "rxjs";
import { LeaveType } from "../../../../models/leave-type";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DateUtil } from "../../../../utilities/date-util";
import { LeaveRequestFilter } from "./leave-request-filter";

@Component({
  selector: 'app-leave-request-filter',
  templateUrl: './leave-request-filter.component.html',
  styleUrls: ['./leave-request-filter.component.scss']
})
export class LeaveRequestFilterComponent implements OnInit {

  leaveType$: Observable<LeaveType[]> = this.leaveTypeService.list().pipe(map(res => res.data));
  filterForm!: FormGroup;
  statuses: string[] = ['All', 'Pending', 'Approved', 'Rejected', 'Canceled'];

  @Output() onSearch$: EventEmitter<LeaveRequestFilter> = new EventEmitter<LeaveRequestFilter>();
  @Output() onClear$: EventEmitter<void> = new EventEmitter<void>();

  constructor(private leaveTypeService: LeaveTypeService, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.filterForm = this.fb.group({
      leaveTypeId: ['All'],
      fromDate: DateUtil.getFirstDayOfCurrentMonth(),
      toDate: DateUtil.getLastDayOfCurrentMonth(),
      status: 'All'
    });
  }

  clear() {
    const defaultFilter: LeaveRequestFilter = {
      fromDate: DateUtil.getFirstDayOfCurrentMonth(),
      toDate: DateUtil.getLastDayOfCurrentMonth(),
      leaveTypeId: 'All',
      status: 'All'
    }
    this.filterForm.reset(defaultFilter);
    this.onClear$.emit();
  }

  search() {
    const value = {
      fromDate: this.filterForm.get('fromDate')?.value.toISOString(),
      toDate: this.filterForm.get('toDate')?.value.toISOString(),
      leaveTypeId: this.filterForm.get('leaveTypeId')?.value === 'All' ? null : this.filterForm.get('leaveTypeId')?.value,
      status: this.filterForm.get('status')?.value === 'All' ? null : this.filterForm.get('status')?.value
    }
    this.onSearch$.emit(value);
  }

}

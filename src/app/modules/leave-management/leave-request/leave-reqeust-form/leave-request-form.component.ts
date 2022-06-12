import { Component, OnInit } from '@angular/core';
import { LeaveType } from "../../../../models/leave-type";
import { LeaveTypeService } from "../../../../services/leave-type.service";
import { EmployeeService } from "../../../../services/employee.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateUtil } from "../../../../utilities/date-util";
import { LeaveRequestService } from "../../../../services/leave-request.service";
import { MessageService } from "../../../../shared/services/message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Moment } from "moment";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize, pluck } from "rxjs/operators";
import { LeaveSummary } from 'src/app/models/leave-summary';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss'],
  providers: [DatePipe]
})
export class LeaveRequestFormComponent implements OnInit {

  backToURL: string = '';
  leaveTypes: LeaveType[] = [];
  leaveOption: { display: string, isFullDay: boolean }[] = [
    {
      display: 'Full Day',
      isFullDay: true
    },
    {
      display: 'Half Day',
      isFullDay: false
    }
  ];
  leaveRequestForm!: FormGroup;
  requestId!: number;
  employee: any;
  leaveSummary!: LeaveSummary;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private leaveTypeService: LeaveTypeService,
    private employeeService: EmployeeService,
    private leaveRequestService: LeaveRequestService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private loaderService: LoaderService
  ) {
    this.requestId = +this.activatedRoute.snapshot.params['id'];
    this.buildForm();
  }

  ngOnInit(): void {
    this.getLeaveTypes();
    this.getCurrentEmployee();
    if (this.requestId) {
      this.loaderService.show();
      this.leaveRequestService.get(this.requestId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const fromDate: Date = new Date(res.data.fromDate);
          const toDate: Date = new Date(res.data.toDate);
          const isFullDay: boolean = res.data.isFullDay === 1;
          const manager = res.data.reportTo;
          const reportToName = `${manager.firstName} ${manager.lastName}`;
          this.leaveRequestForm.patchValue(res.data);
          this.leaveRequestForm.patchValue({ fromDate, toDate, isFullDay, reportToName });
        });
    }
    this.onLeaveOptionChange();
    this.getListURL();
  }

  private getListURL() {
    this.activatedRoute.data
      .pipe(pluck('url'))
      .subscribe((url: string) => {
        this.backToURL = url;
      });
  }

  private buildForm() {
    const fromDate: Date = DateUtil.clearTime(new Date());
    const toDate: Date = DateUtil.addTwentyFourHours(new Date());
    this.leaveRequestForm = this.fb.group({
      employeeId: null,
      leaveTypeId: [null, Validators.required],
      fromDate: [fromDate, Validators.required],
      toDate: [toDate, Validators.required],
      day: null,
      reportToId: null,
      reportToName: '',
      isFullDay: [true, Validators.required],
      reason: ['', Validators.required],
      status: '',
      comment: ''
    });
    this.updateNoOfDay(fromDate, toDate);
  }

  private getLeaveTypes() {
    this.leaveTypeService.getActiveLeaveTypes().subscribe(res => {
      this.leaveTypes = res.data;
    });
  }

  private getCurrentEmployee() {
    this.employeeService.getCurrentEmployee().subscribe(res => {
      this.employee = res.data.employee;
      const manager = this.employee.department.manager;
      const managerName = `${manager.firstName} ${manager.lastName}`;
      this.leaveRequestForm.get('reportToId')?.setValue(manager.id);
      this.leaveRequestForm.get('reportToName')?.setValue(managerName);
      this.leaveRequestForm.get('employeeId')?.setValue(this.employee.id);
    });
  }

  changeDate(date: Moment) {
    if (this.isRequestForHalfDay()) {
      this.leaveRequestForm.get('fromDate')?.setValue(date);
      this.leaveRequestForm.get('toDate')?.setValue(date);
    }
    this.getLeaveDays();
  }

  private isRequestForHalfDay(): boolean {
    return !this.leaveRequestForm.get('isFullDay')?.value;
  }

  private updateNoOfDay(fromDate: Date, toDate: Date) {
    const days = DateUtil.calculateDaysBetween(fromDate, toDate);
    this.leaveRequestForm.get('day')?.setValue(days);
  }

  private onLeaveOptionChange() {
    this.leaveRequestForm.get('isFullDay')?.valueChanges.subscribe(value => {
      const fromDate: Date = this.leaveRequestForm.get('fromDate')?.value;
      if (!value) {
        this.leaveRequestForm.get('toDate')?.setValue(new Date(fromDate));
      }
      this.getLeaveDays();
    });
  }

  selectLeaveType(leaveTypeId: number) {
    this.getLeaveDays();
    this.getLeaveSummary(leaveTypeId);
  }

  getLeaveDays() {
    const leaveTypeId: number = this.leaveRequestForm.get('leaveTypeId')?.value;
    if (!leaveTypeId) {
      return;
    }

    const dateFormat: string = 'yyyy-MM-dd';
    const fromDate: string = this.datePipe.transform(this.leaveRequestForm.get('fromDate')?.value, dateFormat) || '';
    const toDate: string = this.datePipe.transform(this.leaveRequestForm.get('toDate')?.value, dateFormat) || '';
    const payload: any = {
      leaveTypeId,
      fromDate,
      toDate,
      isFullDay: this.leaveRequestForm.get('isFullDay')?.value
    }
    this.leaveRequestService.calculateDays(payload).subscribe(res => {
      this.leaveRequestForm.get('day')?.setValue(res.data.leaveDays);
    });
  }

  submit() {
    if (this.leaveRequestForm.invalid) {
      this.messageService.show('Please input all required fields.');
      return;
    }

    const dateFormat: string = 'yyyy-MM-dd';
    const leaveRequest: any = this.leaveRequestForm.value;
    leaveRequest.fromDate = this.datePipe.transform(leaveRequest.fromDate, dateFormat);
    leaveRequest.toDate = this.datePipe.transform(leaveRequest.toDate, dateFormat);
    this.save(leaveRequest);
  }

  save(leaveRequest: any) {
    this.leaveRequestService.save(leaveRequest).subscribe(res => {
      this.messageService.show('Your leave request has been sent successfully.');
      this.navigateToList();
    }, err => {
      this.messageService.show(err.error.message);
    });
  }

  navigateToList() {
    this.router.navigate([this.backToURL]);
  }

  getLeaveSummary(leaveTypeId: number) {
    this.employeeService.getLeaveSummary(leaveTypeId, this.employee.id)
      .subscribe(res => this.leaveSummary = res.data[0]);
  }

}

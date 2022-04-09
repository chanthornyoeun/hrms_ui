import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { WorkingCalendar } from 'src/app/models/working-calendar';
import { DepartmentService } from 'src/app/services/department.service';
import { WorkingCalendarService } from 'src/app/services/working-calendar.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-working-calendar-form',
  templateUrl: './working-calendar-form.component.html',
  styleUrls: ['./working-calendar-form.component.scss']
})
export class WorkingCalendarFormComponent implements OnInit {

  workingCalendarForm!: FormGroup;
  department$: Observable<Department[]>;
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private calendarId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private workingCalendarService: WorkingCalendarService,
    private departmentService: DepartmentService,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.calendarId = +activatedRoute.snapshot.paramMap.get('id')!;
    this.department$ = this.departmentService.list().pipe(map(res => res.data as Department[]));
  }

  ngOnInit(): void {
    if (this.calendarId) {
      this.workingCalendarService.get(this.calendarId)
        .subscribe(res => {
          const workingCalendar: WorkingCalendar = res.data as WorkingCalendar;
          this.workingCalendarForm.patchValue(workingCalendar);
        });
    }
  }

  private buildForm() {
    this.workingCalendarForm = this.fb.group({
      day: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      workingDuration: [null, Validators.required],
      isWorking: [true, Validators.required],
      departmentId: [null, Validators.required]
    });
  }

  submitForm() {
    const workingCalendar: WorkingCalendar = this.workingCalendarForm.value;
    this.calendarId ? this.update(this.calendarId, workingCalendar) : this.save(workingCalendar);
  }

  private save(workingCalendar: WorkingCalendar) {
    this.workingCalendarService.save(workingCalendar)
      .subscribe(_ => {
        this.messageService.show('Working day has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(calendarId: number, workingCalendar: WorkingCalendar) {
    this.workingCalendarService.update(calendarId, workingCalendar)
      .subscribe(_ => {
        this.messageService.show('Working day has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/working-calendar']);
  }

}

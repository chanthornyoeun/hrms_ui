import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
import { HolidayGroup } from 'src/app/models/holiday-group';
import { HolidayGroupService } from 'src/app/services/holiday-group.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent implements OnInit {

  holidayForm!: FormGroup;
  group$: Observable<HolidayGroup[]>;
  private holidayId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private holidayService: HolidayService,
    private holidayGroupService: HolidayGroupService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.holidayId = +activatedRoute.snapshot.paramMap.get('id')!;
    this.group$ = this.holidayGroupService.list().pipe(map(res => res.data as HolidayGroup[]));
  }

  ngOnInit(): void {
    if (this.holidayId) {
      this.loaderService.show();
      this.holidayService.get(this.holidayId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const holiday: Holiday = res.data as Holiday;
          holiday.holidayDate = new Date(holiday.holidayDate);
          this.holidayForm.patchValue(holiday);
        });
    }
  }

  private buildForm() {
    this.holidayForm = this.fb.group({
      name: ['', Validators.required],
      holidayDate: [null, Validators.required],
      groupId: [null, Validators.required],
      isActive: [true, Validators.required],
      description: ''
    });
  }

  submitForm() {
    const holiday: Holiday = this.holidayForm.value;
    this.holidayId ? this.update(this.holidayId, holiday) : this.save(holiday);
  }

  private save(holiday: Holiday) {
    this.holidayService.save(holiday)
      .subscribe(_ => {
        this.messageService.show('Holiday has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(holidayId: number, holiday: Holiday) {
    this.holidayService.update(holidayId, holiday)
      .subscribe(_ => {
        this.messageService.show('Holiday has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/holidays']);
  }

}

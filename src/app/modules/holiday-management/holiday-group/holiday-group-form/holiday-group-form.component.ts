import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HolidayGroup } from 'src/app/models/holiday-group';
import { HolidayGroupService } from 'src/app/services/holiday-group.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';

@Component({
  selector: 'app-holiday-group-form',
  templateUrl: './holiday-group-form.component.html',
  styleUrls: ['./holiday-group-form.component.scss']
})
export class HolidayGroupFormComponent implements OnInit {

  holidayGroupForm!: FormGroup;
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Holiday Group',
    link: '/dashboard',
    page: 'Form'
  };

  private holidayGroupId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private holidayGroupService: HolidayGroupService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.holidayGroupId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.holidayGroupId) {
      this.loaderService.show();
      this.holidayGroupService.get(this.holidayGroupId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const holidayGroup: HolidayGroup = res.data as HolidayGroup;
          this.holidayGroupForm.patchValue(holidayGroup);
        });
    }
  }

  private buildForm() {
    this.holidayGroupForm = this.fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  submitForm() {
    const holidayGroup: HolidayGroup = this.holidayGroupForm.value;
    this.holidayGroupId ? this.update(this.holidayGroupId, holidayGroup) : this.save(holidayGroup);
  }

  private save(holidayGroup: HolidayGroup) {
    this.holidayGroupService.save(holidayGroup)
      .subscribe(_ => {
        this.messageService.show('Holiday group has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(holidayGroupId: number, holidayGroup: HolidayGroup) {
    this.holidayGroupService.update(holidayGroupId, holidayGroup)
      .subscribe(_ => {
        this.messageService.show('Holiday group has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/holiday-groups']);
  }

}

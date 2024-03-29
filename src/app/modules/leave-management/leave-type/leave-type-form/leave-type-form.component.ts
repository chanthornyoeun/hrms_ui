import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveType } from 'src/app/models/leave-type';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.scss']
})
export class LeaveTypeFormComponent implements OnInit {

  leaveTypeForm!: FormGroup;
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Leave Types',
    link: '/leave-types',
    page: 'Form'
  };
  private leaveTypeId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private leaveTypeService: LeaveTypeService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.leaveTypeId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.leaveTypeId) {
      this.loaderService.show();
      this.leaveTypeService.get(this.leaveTypeId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const leaveType: LeaveType = res.data as LeaveType;
          this.leaveTypeForm.patchValue(leaveType);
        });
    }
  }

  private buildForm() {
    this.leaveTypeForm = this.fb.group({
      type: ['', Validators.required],
      isActive: [true, Validators.required],
      allowanceDay: [null, Validators.required],
      description: ''
    });
  }

  submitForm() {
    const leaveType: LeaveType = this.leaveTypeForm.value;
    this.leaveTypeId ? this.update(this.leaveTypeId, leaveType) : this.save(leaveType);
  }

  private save(leaveType: LeaveType) {
    this.leaveTypeService.save(leaveType)
      .subscribe(_ => {
        this.messageService.show('Leave-Type has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(leaveTypeId: number, leaveType: LeaveType) {
    this.leaveTypeService.update(leaveTypeId, leaveType)
      .subscribe(_ => {
        this.messageService.show('Leave-Type has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/leave-types']);
  }

}

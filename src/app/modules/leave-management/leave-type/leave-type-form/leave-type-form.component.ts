import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveType } from 'src/app/models/leave-type';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.scss']
})
export class LeaveTypeFormComponent implements OnInit {

  leaveTypeForm!: FormGroup;
  private leaveTypeId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private leaveTypeService: LeaveTypeService,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.leaveTypeId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.leaveTypeId) {
      this.leaveTypeService.get(this.leaveTypeId)
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

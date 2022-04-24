import { Component, Input, OnInit } from '@angular/core';
import { LeaveType } from "../../../models/leave-type";
import { LeaveTypeService } from "../../../services/leave-type.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-leave-allowances',
  templateUrl: './leave-allowances.component.html',
  styleUrls: ['./leave-allowances.component.scss']
})
export class LeaveAllowancesComponent implements OnInit {

  @Input() leaveAllowanceFormArray!: FormArray;
  @Input() employeeId!: number | null;
  leaveTypes!: LeaveType[];

  constructor(private leaveTypeService: LeaveTypeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getLeaveTypes();
  }

  private async getLeaveTypes() {
    this.leaveTypes = await this.leaveTypeService.getActiveLeaveTypes().pipe(map(res => res.data)).toPromise();
    console.log(this.employeeId);
    if (!this.employeeId) {
      this.generateLeaveAllowances(this.leaveTypes);
    }
  }

  private generateLeaveAllowances(leaveTypes: LeaveType[]): void {
    leaveTypes.forEach(leaveType => {
      const allowanceForm: FormGroup = this.fb.group({
        id: null,
        leaveTypeId: [leaveType.id, Validators.required],
        allowance: [leaveType.allowanceDay, [Validators.required, Validators.min(0)]]
      });
      this.leaveAllowanceFormArray.push(allowanceForm);
    })
  }

  get formGroups(): FormGroup[] {
    return this.leaveAllowanceFormArray.controls as FormGroup[];
  }

}

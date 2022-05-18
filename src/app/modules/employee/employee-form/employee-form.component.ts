import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { Position } from 'src/app/models/position';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PositionService } from 'src/app/services/position.service';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeId: number;
  titles: string[] = ['Mr', 'Ms', 'Mss'];
  genders: string[] = ['Male', 'Female', 'Other'];
  maritalStatuses: string[] = ['Single', 'Married', 'Divorced'];
  department$: Observable<Department[]>;
  position$: Observable<Position[]>;
  params: HttpParams = new HttpParams().set('order', 'asc').set('limit', '100');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.employeeId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.department$ = this.departmentService.list({params: this.params}).pipe(map(res => res.data as Department[]));
    this.position$ = this.positionService.list({params: this.params}).pipe(map(res => res.data as Position[]));
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.loaderService.show();
      this.employeeService.get(this.employeeId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const leaveAllowances = res.data.leaveAllowances;
          this.employeeForm.patchValue(res.data);
          this.generateLeaveAllowances(leaveAllowances);
        });
    }
  }

  private buildForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      joinedDate: [null, Validators.required],
      jobTitle: [null, Validators.required],
      departmentId: [null, Validators.required],
      positionId: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      maritalStatus: '',
      currentAddress: '',
      physicalAddress: ['', Validators.required],
      isActive: [true, Validators.required],
      leaveAllowances: this.fb.array([])
    });
  }

  get leaveAllowances(): FormArray {
    return this.employeeForm.get('leaveAllowances') as FormArray;
  }

  private generateLeaveAllowances(leaveAllowances: any[]): void {
    leaveAllowances.forEach(leaveAllowance => {
      const allowanceForm: FormGroup = this.fb.group({
        id: null,
        leaveTypeId: [null, Validators.required],
        allowance: [null, [Validators.required, Validators.min(0)]]
      });
      allowanceForm.patchValue(leaveAllowance);
      this.leaveAllowances.push(allowanceForm);
    })
  }

  submitForm() {
    const employee: Employee = this.employeeForm.value;
    this.employeeId ? this.update(this.employeeId, employee) : this.save(employee);
  }

  private save(employee: Employee) {
    this.employeeService.save(employee).subscribe(_ => {
      this.messageService.show('Employee has been created successfully!');
      this.navigateToList()
    });
  }

  private update(employeeId: number, employee: Employee) {
    this.employeeService.update(employeeId, employee).subscribe(_ => {
      this.messageService.show('Employee has been updated successfully!');
      this.navigateToList()
    });
  }

  private navigateToList() {
    this.router.navigate(['/employees']);
  }

}

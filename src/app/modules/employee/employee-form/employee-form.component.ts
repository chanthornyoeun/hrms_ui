import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { FileService } from 'src/app/services/file.service';
import { ResponsiveService } from '../../../services/responsive.service';
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';
import { passwordMismatch, validateExistingUser } from '../../user-management/users/validators/custom-validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeId!: number;
  titles: string[] = ['Mr', 'Ms', 'Mss'];
  genders: string[] = ['Male', 'Female', 'Other'];
  maritalStatuses: string[] = ['Single', 'Married', 'Divorced'];
  department$: Observable<Department[]>;
  position$: Observable<Position[]>;
  params: HttpParams = new HttpParams().set('order', 'asc').set('limit', '100');
  currentDate: Date = new Date();
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Employees',
    link: '/employees',
    page: 'Form'
  };
  userTypes: string[] = ['USER', 'MANAGER', 'HR'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private fileService: FileService,
    public responsive: ResponsiveService,
    private userService: UserService
  ) {
    this.buildForm();
    this.department$ = this.departmentService.list({ params: this.params }).pipe(map(res => res.data as Department[]));
    this.position$ = this.positionService.list({ params: this.params }).pipe(map(res => res.data as Position[]));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.employeeId = param['id'];
      this.employeeId && this.getEmployeeById(this.employeeId);
    });
  }

  private getEmployeeById(employeeId: number) {
    this.loaderService.show();
    this.employeeService.get(employeeId)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        const leaveAllowances = res.data.leaveAllowances;
        this.employeeForm.patchValue(res.data);
        this.employeeForm.markAllAsTouched();
        this.generateLeaveAllowances(leaveAllowances);
        this.removePasswordControls();
        this.updateValidation();
      });
  }

  private buildForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      profilePhoto: '',
      gender: ['', Validators.required],
      dateOfBirth: [null, [Validators.required, this.validateEighteenYearsOld()]],
      joinedDate: [null, Validators.required],
      jobTitle: [null, Validators.required],
      departmentId: [null, [Validators.required]],
      positionId: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], validateExistingUser(this.userService)],
      phone: [null, Validators.required],
      maritalStatus: '',
      currentAddress: '',
      physicalAddress: ['', Validators.required],
      isActive: [true, Validators.required],
      leaveAllowances: this.fb.array([]),
      emergencyContacts: this.fb.array([
        this.fb.group({
          id: null,
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
          description: ''
        }),
        this.fb.group({
          id: null,
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
          description: ''
        })
      ]),
      user: this.fb.group({
        username: ['', [Validators.required], validateExistingUser(this.userService)],
        type: [this.userTypes[0], Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validators: passwordMismatch(),
        updateOn: 'blur'
      })
    });
  }

  get leaveAllowances(): FormArray {
    return this.employeeForm.get('leaveAllowances') as FormArray;
  }

  get emergencyContacts(): FormArray {
    return this.employeeForm.get('emergencyContacts') as FormArray;
  }

  get userForm(): FormGroup {
    return this.employeeForm.get('user') as FormGroup;
  }

  private removePasswordControls() {
    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
    this.userForm.clearValidators();
    this.userForm.updateValueAndValidity();
    this.employeeForm.updateValueAndValidity();
  }

  private updateValidation() {
    const usernameCtl = this.userForm.get('username')!;
    const email = this.employeeForm.get('email')!;
    usernameCtl.clearAsyncValidators();
    usernameCtl.updateValueAndValidity();
    email.clearAsyncValidators();
    email.updateValueAndValidity();
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
    employee.emergencyContacts = employee.emergencyContacts.filter(contact => (contact.name && contact.phoneNumber));
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

  upload($event: any) {
    this.loaderService.show();
    this.fileService.upload($event.files[0])
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.employeeForm.get('profilePhoto')?.setValue(res.data['url']);
      });
  }

  validateEighteenYearsOld(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const age = new Date(control.value).getFullYear();
        const currentYear: number = new Date().getFullYear();
        return currentYear - age < 18 ? { ineligibleAge: true } : null;
      }
      return null;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;
  manager$: Observable<Employee[]>;
  private positionId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.positionId = +activatedRoute.snapshot.paramMap.get('id')!;
    this.manager$ = employeeService.list().pipe(map(res => res.data as Employee[]));
  }

  ngOnInit(): void {
    if (this.positionId) {
      this.loaderService.show();
      this.departmentService.get(this.positionId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const position: Department = res.data as Department;
          this.departmentForm.patchValue(position);
        });
    }
  }

  private buildForm() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required],
      managerId: null,
      description: ''
    });
  }

  submitForm() {
    const position: Department = this.departmentForm.value;
    this.positionId ? this.update(this.positionId, position) : this.save(position);
  }

  private save(position: Department) {
    this.departmentService.save(position)
      .subscribe(_ => {
        this.messageService.show('Department has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(departmentId: number, department: Department) {
    this.departmentService.update(departmentId, department)
      .subscribe(_ => {
        this.messageService.show('Department has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/departments']);
  }

}

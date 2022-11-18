import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { PositionDialogComponent } from '../position-dialog/position-dialog.component';
import { Position } from 'src/app/models/position';
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;
  private departmentId: number;
  department!: Department;
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Department',
    link: '/departments',
    page: 'Form'
  };

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {
    this.buildForm();
    this.departmentId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.departmentId) {
      this.loaderService.show();
      this.departmentService.get(this.departmentId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          this.department = res.data as Department;
          this.departmentForm.patchValue(this.department);
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
    const department: Department = this.departmentForm.value;
    department.positions = this.department.positions;
    this.departmentId ? this.update(this.departmentId, department) : this.save(department);
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

  openPositionForm(data?: { index: number, position: Position }) {
    const dialogRef = this.dialog.open(PositionDialogComponent, {
      width: '1000px',
      disableClose: true,
      // autoFocus: false,
      data: { ...data?.position, departmentId: this.departmentId }
    });
    dialogRef.afterClosed().subscribe(position => {
      if (!position) return;
      console.log(position);
      (data && data.index >= 0) ? this.department.positions.splice(data.index, 1, position) : this.department.positions.push(position);
      this.department.positions = [...this.department.positions];
    });
  }

  private nagivateToPositionList() {
    this.route.navigate(['/departments']);
  }

}

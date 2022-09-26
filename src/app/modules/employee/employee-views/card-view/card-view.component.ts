import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  employees: Employee[] = [];
  offset: number = 0;
  limit: number = 20;
  total: number = 0;
  isLoading: boolean = false;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit });
    this.getEmployees(params);
  }

  getEmployees(params?: HttpParams): void {
    this.isLoading = true;
    this.employeeService.list({ params })
      .pipe(
        map(res => {
          this.offset = this.offset + this.limit;
          this.total = res.total;
          return res.data;
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(employees => {
        this.employees.push(...employees);
      });
  }

  onScrollDown(): void {
    const params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit });
    this.getEmployees(params);
  }

}

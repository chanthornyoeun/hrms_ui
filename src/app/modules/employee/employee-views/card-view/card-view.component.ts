import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EmployeeSearch } from "../../employee-search-form/employee-search";

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
    private employeeService: EmployeeService,
    private paginationHistoryService: PaginationHistoryService
  ) { }

  ngOnInit(): void {
    this.getEmployees(this.getQueryHistory());
  }

  private getQueryHistory(): HttpParams {
    const queryParams: { [key: string]: any } = this.paginationHistoryService.getQueryParams();
    Object.keys(queryParams).forEach((key: string) => {
      if (queryParams.hasOwnProperty(key) && queryParams[key] === 'All') {
        queryParams[key] = null;
      }
    });
    return ParamsBuilder.build({ offset: this.offset, limit: this.limit, ...queryParams });
  }

  private getEmployees(params?: HttpParams): void {
    if (!params) {
      params = ParamsBuilder.build({ offset: 0, limit: this.limit });
    }
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
    if (this.total > this.offset) {
      const queryParams: object = this.paginationHistoryService.getQueryParams();
      let params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit, ...queryParams });
      this.getEmployees(params);
    }
  }

  search($event: EmployeeSearch) {
    this.employees = [];
    const params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit, ...$event });
    this.paginationHistoryService.updateQueryParams($event);
    this.getEmployees(params);
  }

  clear() {
    this.offset = 0;
    this.employees = [];
    this.paginationHistoryService.updateQueryParams({});
    this.getEmployees();
  }

}

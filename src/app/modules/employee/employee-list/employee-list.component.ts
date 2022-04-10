import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EmployeeSearch } from '../employee-search-form/employee-search';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends Pagination {

  displayedColumns: string[];
  employee$!: Observable<Employee[]>;
  pageSizeOptions: number[] = [10, 25, 50, 100, 250, 500];
  searchCtl: FormControl = new FormControl();

  constructor(
    private employeeService: EmployeeService
  ) {
    super();
    this.displayedColumns = ['id', 'name', 'gender', 'dob', 'department', 'position', 'jobTitle', 'joinedDate', 'isActive', 'phone', 'email', 'address', 'actions'];
    this.list(this.params);
  }
  
  list(params?: HttpParams) {
    this.employee$ = this.employeeService.list({params}).pipe(
      map(res => { 
        this.total = res.total;
        return res.data as Employee[];
      }));
  }

  handleSearch($event: EmployeeSearch) {
    const params: HttpParams = ParamsBuilder.build($event);
    this.list(params);
  }

  clear() {
    this.list();
  }

}

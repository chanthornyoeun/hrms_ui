import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EmployeeSearch } from '../employee-search-form/employee-search';
import { ColumnConfig } from "../../../shared/components/data-grid/data-grid.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends Pagination {

  employee$!: Observable<Employee[]>;
  searchCtl: FormControl = new FormControl();
  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Gender', field: 'gender' },
      { headerText: 'Date of Birth', field: 'dateOfBirth', format: 'dateFormat' },
      { headerText: 'Department', field: 'departmentId', renderer: record => record.department?.name },
      { headerText: 'Position', field: 'positionId', renderer: record => record.position?.position },
      { headerText: 'Job Title', field: 'jobTitle' },
      { headerText: 'Joined Date', field: 'joinedDate', format: 'dateFormat' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Phone', field: 'phone' },
      { headerText: 'Email', field: 'email' },
      { headerText: 'Address', field: 'physicalAddress' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  };

  constructor(private employeeService: EmployeeService) {
    super();
    this.list(this.params);
  }

  list(params?: HttpParams) {
    this.employee$ = this.employeeService.list({ params }).pipe(
      map(res => {
        this.total = res.total;
        return res.data as Employee[];
      }));
  }

  handleSearch($event: EmployeeSearch) {
    const params: HttpParams = ParamsBuilder.build($event);
    this.list(params);
  }

}

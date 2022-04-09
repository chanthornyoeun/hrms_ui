import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  displayedColumns: string[];
  employee$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    this.displayedColumns = ['id', 'name', 'gender', 'dob', 'department', 'position', 'jobTitle', 'joinedDate', 'isActive', 'phone', 'email', 'address', 'actions'];
    this.employee$ = employeeService.list().pipe(map(res => res.data as Employee[]));
  }

}

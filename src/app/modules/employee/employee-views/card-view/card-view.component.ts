import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  employees!: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.loaderService.show();
    this.employeeService.list()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.employees = res.data);
  }

}

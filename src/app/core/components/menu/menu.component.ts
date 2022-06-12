import { Component, OnInit } from '@angular/core';
import { Page, pagePermission } from "../../page";
import { EmployeeService } from "../../../services/employee.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages: Array<Page> = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getCurrentEmployee();
  }

  private getCurrentEmployee() {
    this.employeeService.getCurrentEmployee().subscribe(res => {
      const role: string = res.data.roles[0].roleName;
      this.pages = pagePermission.get(role);
    });
  }

}

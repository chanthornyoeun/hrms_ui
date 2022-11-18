import { Component } from '@angular/core';
import { BreadcrumbConfig } from 'src/app/models/breadcrumb-config';
import { ResponsiveService } from '../../../services/responsive.service';

@Component({
  selector: 'app-employee-views',
  templateUrl: './employee-views.component.html',
  styleUrls: ['./employee-views.component.scss']
})
export class EmployeeViewsComponent {

  views: any[] = [
    { value: 'grid', icon: 'grid_view', checked: true },
    { value: 'list', icon: 'list', checked: false }
  ];
  view: string = 'grid';
  breadcrumbConfig: BreadcrumbConfig = {
    title: 'Dashboard',
    link: '/dashboard',
    page: 'Employees'
  };

  constructor(public responsive: ResponsiveService) { }

  toggleView(viewMode: any) {
    this.view = viewMode.value;
  }

}

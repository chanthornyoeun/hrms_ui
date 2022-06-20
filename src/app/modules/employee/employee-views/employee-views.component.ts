import { Component } from '@angular/core';
import { ResponsiveService } from '../../../services/responsive.service';

@Component({
  selector: 'app-employee-views',
  templateUrl: './employee-views.component.html',
  styleUrls: ['./employee-views.component.scss']
})
export class EmployeeViewsComponent {

  views: any[] = [
    {value: 'grid', icon: 'grid_view', checked: true},
    {value: 'list', icon: 'list', checked: false}
  ];
  view: string = 'grid';

  constructor(public responsive: ResponsiveService) { }

  toggleView(viewMode: any) {
    this.view = viewMode.value;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-views',
  templateUrl: './employee-views.component.html',
  styleUrls: ['./employee-views.component.scss']
})
export class EmployeeViewsComponent implements OnInit {

  views: any[] = [
    {value: 'grid', icon: 'grid_view', checked: true},
    {value: 'list', icon: 'list', checked: false}
  ];

  view: string = 'grid';

  constructor() { }

  ngOnInit(): void {
  }

  toggleView(viewMode: any) {
    this.view = viewMode.value;
  }

}

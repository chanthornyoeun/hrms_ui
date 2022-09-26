import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-card-skeleton',
  templateUrl: './employee-card-skeleton.component.html',
  styleUrls: [
    './employee-card-skeleton.component.scss',
    './../employee-card/employee-card.component.scss'
  ]
})
export class EmployeeCardSkeletonComponent implements OnInit {

  @Input() displayItem: number = 10;
  items: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = Array.from({length: this.displayItem});
  }

}

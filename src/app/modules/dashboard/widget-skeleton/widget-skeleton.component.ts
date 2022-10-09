import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-skeleton',
  templateUrl: './widget-skeleton.component.html',
  styleUrls: [
    './widget-skeleton.component.scss',
    './../widget/widget.component.scss'
  ]
})
export class WidgetSkeletonComponent implements OnInit {

  @Input() displayItem: number = 4;
  items: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = Array.from({ length: this.displayItem });
  }

}

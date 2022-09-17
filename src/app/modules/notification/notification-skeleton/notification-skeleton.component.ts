import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-notification-skeleton',
  templateUrl: './notification-skeleton.component.html',
  styleUrls: [
    './../notification.component.scss',
    './notification-skeleton.component.scss'
  ]
})
export class NotificationSkeletonComponent implements OnInit {

  @Input() displayItem: number = 0;
  width!: string;
  items: number[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.items = Array.from({length: this.displayItem});
    this.getWidth();
  }

  getWidth() {
    this.isHandset$.subscribe(isHandset => this.width = isHandset ? 'calc(100vw - 123px)' : '550px');
  }

}

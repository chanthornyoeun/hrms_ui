import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'human-resource-management-system-ui';

  constructor(
    private responsiveService: ResponsiveService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.notificationService.requestPermission();
  }

  ngOnDestroy(): void {
    this.responsiveService.ngOnDestroy();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';
import { NotificationService } from './services/notification.service';
import { SvgIconService } from './services/svg-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'human-resource-management-system-ui';

  constructor(
    private responsiveService: ResponsiveService,
    private notificationService: NotificationService,
    private svgIconService: SvgIconService
  ) { 
    this.svgIconService.registerIcons();
  }

  ngOnInit(): void {
    this.notificationService.receiveMessage();
  }

  ngOnDestroy(): void {
    this.responsiveService.ngOnDestroy();
  }

}

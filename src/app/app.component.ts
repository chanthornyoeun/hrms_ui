import { Component, OnDestroy } from '@angular/core';
import { ResponsiveService } from './services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'human-resource-management-system-ui';
  
  constructor(private responsiveService: ResponsiveService) { }

  ngOnDestroy(): void {
    this.responsiveService.ngOnDestroy();
  }
  
}

import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgIconService {

  private iconNames: string[] = [
    'daily_attendent',
    'department',
    'dependent',
    'employee_leave',
    'holiday_group',
    'holiday',
    'leave_type',
    'position',
    'role',
    'working_calendar'
  ];

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) { }

  registerIcons() {
    this.iconNames.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/images/icons/${icon}.svg`)
      );
    });
  }

}

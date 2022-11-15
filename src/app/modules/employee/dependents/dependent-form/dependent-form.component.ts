import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./../../popup-form.scss']
})
export class DependentFormComponent implements OnInit {

  @Input() dependentForm!: FormGroup;
  currentDate: Date = new Date();
  dependentTypes: string[] = [
    'Father',
    'Mother',
    'Brother',
    'Father',
    'Son',
    'Daughter',
    'Other'
  ];

  constructor(public responsive: ResponsiveService) { }

  ngOnInit(): void {
    const dependentType: string = this.dependentForm.value['dependentType'];
    if (dependentType && !this.dependentTypes.includes(dependentType)) {
      this.appendDependentType(dependentType);
    }
  }

  private appendDependentType(dependentType: string) {
    this.dependentTypes.splice(-1, 0, dependentType);
  }

}

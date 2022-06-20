import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./../../popup-form.scss']
})
export class EducationFormComponent {

  @Input() educationForm!: FormGroup;

  constructor(public responsive: ResponsiveService) { }
  
}

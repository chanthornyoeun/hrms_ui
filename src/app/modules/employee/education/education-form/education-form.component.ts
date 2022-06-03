import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent {

  @Input() educationForm!: FormGroup;
  
}

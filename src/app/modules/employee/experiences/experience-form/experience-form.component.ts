import { Component, Input } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./../../popup-form.scss']
})
export class ExperienceFormComponent {

  @Input() experienceForm!: any;

  constructor(public responsive: ResponsiveService) { }

}

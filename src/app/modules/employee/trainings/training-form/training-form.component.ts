import { Component, Input } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./../../popup-form.scss']
})
export class TrainingFormComponent {

  @Input() trainingForm!: any;

  constructor(public responsive: ResponsiveService) { }

}

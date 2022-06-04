import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent {

  @Input() trainingForm!: any;

}

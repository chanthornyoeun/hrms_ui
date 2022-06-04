import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-emergency-contact-form',
  templateUrl: './emergency-contact-form.component.html',
  styleUrls: ['./emergency-contact-form.component.scss']
})
export class EmergencyContactFormComponent {

  @Input() emergencyForm!: any;

}

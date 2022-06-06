import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {

  @Input() employee!: Employee;
  defaultImage: string = './assets/images/deafult-image.png'
  
}

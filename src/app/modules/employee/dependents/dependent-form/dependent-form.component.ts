import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DependentType } from 'src/app/models/dependent-type';
import { DependentTypeService } from 'src/app/services/dependent-type.service';

@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./dependent-form.component.scss']
})
export class DependentFormComponent {

  @Input() dependentForm!: FormGroup;
  currentDate: Date = new Date();
  dependentType$: Observable<DependentType[]> = this.dependentTypeService.list().pipe(map(res => res.data));

  constructor(private dependentTypeService: DependentTypeService) { }

}

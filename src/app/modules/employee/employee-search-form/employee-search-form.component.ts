import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Position } from 'src/app/models/position';
import { DepartmentService } from 'src/app/services/department.service';
import { PositionService } from 'src/app/services/position.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EmployeeSearch } from './employee-search';

@Component({
  selector: 'app-employee-search-form',
  templateUrl: './employee-search-form.component.html',
  styleUrls: ['./employee-search-form.component.scss']
})
export class EmployeeSearchFormComponent {

  searchForm: FormGroup;
  department$: Observable<Department[]>;
  position$: Observable<Position[]>;
  @Output() onSearch$: EventEmitter<EmployeeSearch> = new EventEmitter<EmployeeSearch>();
  @Output() onClear$: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private fb: FormBuilder
  ) { 
    const params: HttpParams = ParamsBuilder.build({limit: 100});
    this.department$ = this.departmentService.list({params}).pipe(map(res => res.data));
    this.position$ = this.positionService.list({params}).pipe(map(res => res.data));
    this.searchForm = this.fb.group({
      departmentId: null,
      positionId: null,
      search: ''
    });
  }

  clear() {
    this.searchForm.reset();
    this.onClear$.emit();
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Position } from 'src/app/models/position';
import { DepartmentService } from 'src/app/services/department.service';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
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
    private fb: FormBuilder,
    private paginationHistoryService: PaginationHistoryService
  ) {
    const params: HttpParams = ParamsBuilder.build({ limit: 100 });
    this.department$ = this.departmentService.list({ params }).pipe(map(res => res.data));
    this.position$ = this.positionService.list({ params }).pipe(map(res => res.data));
    this.searchForm = this.fb.group({
      departmentId: 'All',
      positionId: 'All',
      search: ''
    });
    const queryParams: { [key: string]: any } = this.paginationHistoryService.getQueryParams();
    if (queryParams) {
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams.hasOwnProperty(key) && queryParams[key] === null) {
          queryParams[key] = 'All';
        }
      });
      this.searchForm.patchValue(queryParams);
    }
  }

  search() {
    const value: EmployeeSearch = {
      departmentId: this.searchForm.get('departmentId')?.value === 'All' ? null : this.searchForm.get('departmentId')?.value,
      positionId: this.searchForm.get('positionId')?.value === 'All' ? null : this.searchForm.get('positionId')?.value,
      search: this.searchForm.get('search')?.value
    }
    this.onSearch$.emit(value);
  }

  clear() {
    const defaultFilter: EmployeeSearch = {
      departmentId: 'All',
      positionId: 'All',
      search: ''
    }
    this.searchForm.reset(defaultFilter);
    this.onClear$.emit();
  }

}

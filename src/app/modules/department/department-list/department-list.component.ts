import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends Pagination implements OnInit {

  searchCtl: FormControl = new FormControl();
  department$!: Observable<Department[]>;
  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'name' },
      { headerText: 'Manager', field: 'managerId', renderer: record => record.manager?.firstName + ' ' + record.manager?.lastName },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'date' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(
    private departmentService: DepartmentService,
    private loaderService: LoaderService
  ) {
    super();
    this.list(this.params);
  }

  ngOnInit() {
    this.searchCtl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value) => {
      const params = new HttpParams().set('search', value?.trim());
      this.list(params);
    });
  }

  list(params: HttpParams) {
    this.loaderService.show();
    const query: string = this.searchCtl.value;
    if (query) {
      params = params.set('search', query.trim());
    }

    this.department$ = this.departmentService.list({ params }).pipe(
      finalize(() => this.loaderService.hide()),
      map(res => {
        this.total = res.total;
        return res.data as Department[]
      })
    );
  }

}

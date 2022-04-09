import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DependentType } from 'src/app/models/dependent-type';
import { DependentTypeService } from 'src/app/services/dependent-type.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';

@Component({
  selector: 'app-dependent-type-list',
  templateUrl: './dependent-type-list.component.html',
  styleUrls: ['./dependent-type-list.component.scss']
})
export class DependentTypeListComponent extends Pagination {

  dependentType$!: Observable<DependentType[]>;

  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Short Description', field: 'shortDescription' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'date' },
      { headerText: 'Description', field: 'description', format: 'excerpt' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(private dependentTypeService: DependentTypeService) {
    super();
    this.list(this.params);
  }

  list(params: HttpParams) {
    this.dependentType$ = this.dependentTypeService.list({ params })
      .pipe(map(res => {
        this.total = res.total;
        return res.data as DependentType[];
      }));
  }

}

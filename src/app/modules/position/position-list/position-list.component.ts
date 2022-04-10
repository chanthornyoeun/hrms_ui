import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/services/position.service';
import { ColumnConfig } from 'src/app/shared/components/data-grid/data-grid.component';
import { Pagination } from 'src/app/shared/components/data-grid/pagination';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent extends Pagination implements OnInit {

  searchCtl: FormControl = new FormControl();
  position$!: Observable<Position[]>;
  config: ColumnConfig = {
    columnDefs: [
      { headerText: 'Id', field: 'id' },
      { headerText: 'Name', field: 'position' },
      { headerText: 'Active', field: 'isActive', format: 'active' },
      { headerText: 'Created Date', field: 'createdAt', format: 'date' },
      { headerText: 'Description', field: 'description' },
      { headerText: 'Actions', field: 'actions', type: 'actions' }
    ],
    rowActions: [
      { icon: 'edit', link: 'update/', tooltip: 'Edit' }
    ]
  }

  constructor(private positionService: PositionService) {
    super();
    this.list(this.params);
  }

  ngOnInit(): void {
    this.searchCtl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value) => {
      const params = new HttpParams().set('search', value?.trim());
      this.list(params);
    });
  }

  list(params?: HttpParams): void {
    this.position$ = this.positionService.list({ params })
      .pipe(map(res => {
        this.total = res.total;
        return res.data as Position[];
      }));
  }

}

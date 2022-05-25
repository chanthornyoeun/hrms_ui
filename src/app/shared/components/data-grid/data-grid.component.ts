import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationHistory } from 'src/app/services/pagination-history.service';

type ColumnType = 'normal' | 'actions';

export interface ColumnDef {
  headerText: string;
  field: string;
  type?: ColumnType;
  format?: any;
  renderer?: (record: any) => string;
}

export interface RowAction {
  label?: string;
  icon?: string;
  color?: string;
  tooltip?: string;
  link?: string;
  click?: (val: any) => void;
  showOption?: (val: any) => boolean;
}

export interface ColumnConfig {
  columnDefs: ColumnDef[];
  rowActions: RowAction[];
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() columnConfig!: ColumnConfig;
  @Input() rowData: any;
  @Input() totalRecord: number = 0;
  @Input() defaultPageSize: number = 10;
  displayedColumns: string[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100, 250, 500];
  @Output() pageChange$: EventEmitter<PaginationHistory> = new EventEmitter<PaginationHistory>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  private pagination: PaginationHistory = {
    pageIndex: 0,
    pageSize: 10,
    offset: 0
  };

  ngOnInit(): void {
    this.displayedColumns = this.columnConfig.columnDefs.map(c => c.field);
  }

  onPageChange($event: PageEvent) {
    this.pagination.pageSize = $event.pageSize;
    this.pagination.offset = $event.pageSize * $event.pageIndex;
    this.pagination.pageIndex = $event.pageIndex;
    this.pageChange$.emit(this.pagination);
  }

  updatePagination(pagination: PaginationHistory) {
    this.pagination = pagination;
    this.paginator.pageIndex = pagination.pageIndex;
    this.paginator.pageSize = pagination.pageSize;
  }

}

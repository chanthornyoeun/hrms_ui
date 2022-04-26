import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
  @Output() pageChange$: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {
    this.displayedColumns = this.columnConfig.columnDefs.map(c => c.field);
  }

  onPageChange($event: PageEvent) {
    this.pageChange$.emit($event);
  }

}

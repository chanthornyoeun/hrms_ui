import { Component, Input, OnInit } from '@angular/core';

type ColumnType = 'normal' | 'actions';

export interface ColumnDef {
  headerText: string;
  field: string;
  type?: ColumnType;
  format?: any;
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
  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columnConfig.columnDefs.map(c => c.field);
  }

}

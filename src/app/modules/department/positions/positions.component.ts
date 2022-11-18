import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'isActive', 'description', 'action'];
  @Input() positions: Position[] = [];
  @Output() edit$: EventEmitter<{ index: number, position: Position }> = new EventEmitter<{ index: number, position: Position }>();

  constructor() { }

  ngOnInit(): void {
  }

}

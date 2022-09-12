import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/leave-requst';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() employee!: Employee;
  @Input() width: string = '40px';
  @Input() height: string = '40px';

  constructor() { }

  ngOnInit(): void {
  }

}

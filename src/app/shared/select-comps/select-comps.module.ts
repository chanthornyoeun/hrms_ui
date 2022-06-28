import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { EmployeeSelectComponent } from './employee-select/employee-select.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


const comps: any[] = [
  EmployeeSelectComponent,
];


@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatSelectInfiniteScrollModule
  ],
  exports: comps
})
export class SelectCompsModule { }

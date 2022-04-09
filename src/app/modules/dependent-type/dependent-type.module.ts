import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependentTypeRoutingModule } from './dependent-type-routing.module';
import { DependentTypeFormComponent } from './dependent-type-form/dependent-type-form.component';
import { DependentTypeListComponent } from './dependent-type-list/dependent-type-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DependentTypeFormComponent,
    DependentTypeListComponent
  ],
  imports: [
    CommonModule,
    DependentTypeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DependentTypeModule { }

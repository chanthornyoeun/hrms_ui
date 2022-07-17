import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleFormComponent } from './role-form/role-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { PaggConfigureComponent } from './pagg-configure/pagg-configure.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    RoleListComponent,
    RoleFormComponent,
    PaggConfigureComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialCompModule
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class RoleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { SelectCompsModule } from 'src/app/shared/select-comps/select-comps.module';
import { RoleAssignmentComponent } from './role-assignment/role-assignment.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserListComponent,
    RoleAssignmentComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialCompModule,
    ReactiveFormsModule,
    SharedModule,
    SelectCompsModule
  ],
  providers: [
    PaginationHistoryService
  ]
})
export class UsersModule { }

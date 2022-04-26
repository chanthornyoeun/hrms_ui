import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveTypeFormComponent } from './leave-type-form/leave-type-form.component';
import { LeaveTypeListComponent } from './leave-type-list/leave-type-list.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveTypeListComponent
  },
  {
    path: 'create',
    component: LeaveTypeFormComponent
  },
  {
    path: 'update/:id',
    component: LeaveTypeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTypeRoutingModule { }

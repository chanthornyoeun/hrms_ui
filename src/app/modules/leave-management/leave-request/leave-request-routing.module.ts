import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { LeaveRequestFormComponent } from "./leave-reqeust-form/leave-request-form.component";
import { LeaveRequestViewComponent } from './leave-request-view/leave-request-view.component';
import { PendingLeavesComponent } from './pending-leaves/pending-leaves.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveRequestListComponent
  },
  {
    path: 'create',
    component: LeaveRequestFormComponent
  },
  {
    path: 'view/:id',
    component: LeaveRequestViewComponent
  },
  {
    path: 'pending',
    component: PendingLeavesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestRoutingModule { }

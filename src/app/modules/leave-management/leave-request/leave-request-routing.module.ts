import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { LeaveRequestFormComponent } from "./leave-reqeust-form/leave-request-form.component";
import { LeaveRequestViewComponent } from './leave-request-view/leave-request-view.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveRequestListComponent
  },
  {
    path: ':status',
    component: LeaveRequestsComponent
  },
  {
    path: 'create',
    component: LeaveRequestFormComponent
  },
  {
    path: 'view/:id',
    component: LeaveRequestViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestRoutingModule { }

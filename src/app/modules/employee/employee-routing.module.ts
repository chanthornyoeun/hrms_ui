import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeViewsComponent } from './employee-views/employee-views.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeViewsComponent
  },
  {
    path: 'create',
    component: EmployeeFormComponent
  },
  {
    path: 'update/:id',
    component: EmployeeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

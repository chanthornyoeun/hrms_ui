import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { PositionsComponent } from './positions/positions.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent
  },
  {
    path: 'create',
    component: DepartmentFormComponent
  },
  {
    path: 'update/:id',
    component: DepartmentFormComponent
  },
  {
    path: 'view/:id',
    component: PositionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }

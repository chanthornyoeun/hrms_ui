import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaggConfigureComponent } from './pagg-configure/pagg-configure.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent
  },
  {
    path: 'create',
    component: RoleFormComponent
  },
  {
    path: 'update/:id',
    component: RoleFormComponent
  },
  {
    path: 'apply-pages/:id',
    component: PaggConfigureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }

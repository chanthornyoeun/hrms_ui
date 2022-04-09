import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependentTypeFormComponent } from './dependent-type-form/dependent-type-form.component';
import { DependentTypeListComponent } from './dependent-type-list/dependent-type-list.component';

const routes: Routes = [
  {
    path: '',
    component: DependentTypeListComponent
  },
  {
    path: 'create',
    component: DependentTypeFormComponent
  },
  {
    path: 'update/:id',
    component: DependentTypeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependentTypeRoutingModule { }

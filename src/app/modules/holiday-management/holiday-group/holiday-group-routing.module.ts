import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayGroupFormComponent } from './holiday-group-form/holiday-group-form.component';
import { HolidayGroupListComponent } from './holiday-group-list/holiday-group-list.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayGroupListComponent
  },
  {
    path: 'create',
    component: HolidayGroupFormComponent
  },
  {
    path: 'update/:id',
    component: HolidayGroupFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayGroupRoutingModule { }

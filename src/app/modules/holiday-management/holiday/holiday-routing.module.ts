import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListComponent
  },
  {
    path: 'create',
    component: HolidayFormComponent
  },
  {
    path: 'update/:id',
    component: HolidayFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule { }

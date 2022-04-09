import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingCalendarFormComponent } from './working-calendar-form/working-calendar-form.component';
import { WorkingCalendarListComponent } from './working-calendar-list/working-calendar-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkingCalendarListComponent
  },
  {
    path: 'create',
    component: WorkingCalendarFormComponent
  },
  {
    path: 'update/:id',
    component: WorkingCalendarFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingCalendarRoutingModule { }

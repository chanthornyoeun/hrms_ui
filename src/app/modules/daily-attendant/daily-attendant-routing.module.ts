import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyAttendantComponent } from './daily-attendant.component';

const routes: Routes = [{ path: '', component: DailyAttendantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyAttendantRoutingModule { }

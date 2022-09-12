import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationConfigureComponent } from './notification-configure.component';

const routes: Routes = [{ path: '', component: NotificationConfigureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationConfigureRoutingModule { }

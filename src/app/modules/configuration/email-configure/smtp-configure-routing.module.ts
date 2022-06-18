import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfigureComponent } from './email-configure.component';

const routes: Routes = [{ path: '', component: EmailConfigureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmtpConfigureRoutingModule { }

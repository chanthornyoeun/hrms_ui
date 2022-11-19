import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement/announcement.component';
import { RouterModule } from '@angular/router';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AnnouncementComponent
    }]),
    MaterialCompModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AnnouncementModule { }

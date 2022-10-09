import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';
import { WidgetSkeletonComponent } from './widget-skeleton/widget-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    WidgetSkeletonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialCompModule,
    NgxSkeletonLoaderModule,
  ]
})
export class DashboardModule { }

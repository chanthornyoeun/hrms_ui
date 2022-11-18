import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from "./loader/loader.service";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { ConfirmationService } from './confirmation/confirmation.service';
import { AvatarComponent } from './avatar/avatar.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MaterialCompModule } from '../material-comp/material-comp.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const comps = [
  DataGridComponent,
  LoaderComponent,
  ConfirmationComponent,
  AvatarComponent,
  BreadcrumbComponent
];

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MaterialCompModule,
    RouterModule,
    PipesModule,
    LazyLoadImageModule
  ],
  exports: comps,
  providers: [LoaderService, ConfirmationService]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagementRoutingModule } from './page-management-routing.module';
import { PageManagementComponent } from './page-management.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { PageFormComponent } from './page-form/page-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components/components.module';


@NgModule({
  declarations: [
    PageManagementComponent,
    PageFormComponent
  ],
  imports: [
    CommonModule,
    PageManagementRoutingModule,
    ReactiveFormsModule,
    MaterialCompModule,
    ComponentsModule
  ]
})
export class PageManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PipesModule } from '../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from "./loader/loader.service";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { ConfirmationService } from './confirmation/confirmation.service';
import { AvatarComponent } from './avatar/avatar.component';

const comps = [
  DataGridComponent,
  LoaderComponent,
  ConfirmationComponent,
  AvatarComponent
];

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule,
    PipesModule
  ],
  exports: comps,
  providers: [LoaderService, ConfirmationService]
})
export class ComponentsModule { }

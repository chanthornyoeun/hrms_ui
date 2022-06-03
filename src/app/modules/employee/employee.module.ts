import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeSearchFormComponent } from './employee-search-form/employee-search-form.component';
import { LeaveAllowancesComponent } from './leave-allowances/leave-allowances.component';
import { DATEPICKER_PROVIDER } from "../../config";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ExperienceFormComponent } from './experiences/experience-form/experience-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExperienceDialogComponent } from './experiences/experience-dialog/experience-dialog.component';
import { ExperienceDialogService } from './experiences/services/experience-dialog.service';
import { ExperienceFormService } from './experiences/services/experience-form.service';
import { ExperienceListComponent } from './experiences/experience-list/experience-list.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeSearchFormComponent,
    LeaveAllowancesComponent,
    ExperienceFormComponent,
    ExperienceDialogComponent,
    ExperienceListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    DATEPICKER_PROVIDER,
    PaginationHistoryService,
    ExperienceDialogService,
    ExperienceFormService,
  ]
})
export class EmployeeModule { }

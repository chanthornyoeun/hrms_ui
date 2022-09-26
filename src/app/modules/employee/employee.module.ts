import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-views/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeSearchFormComponent } from './employee-search-form/employee-search-form.component';
import { LeaveAllowancesComponent } from './leave-allowances/leave-allowances.component';
import { DATEPICKER_PROVIDER } from "../../config";
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { ExperienceFormComponent } from './experiences/experience-form/experience-form.component';
import { ExperienceDialogComponent } from './experiences/experience-dialog/experience-dialog.component';
import { ExperienceDialogService } from './experiences/services/experience-dialog.service';
import { ExperienceFormService } from './experiences/services/experience-form.service';
import { ExperienceListComponent } from './experiences/experience-list/experience-list.component';
import { EducationFormComponent } from './education/education-form/education-form.component';
import { EducationDialogComponent } from './education/education-dialog/education-dialog.component';
import { EducationListComponent } from './education/education-list/education-list.component';
import { EducationFormService } from './education/services/education-form.service';
import { EducationDialogService } from './education/services/education-dialog.service';
import { TrainingFormComponent } from './trainings/training-form/training-form.component';
import { TrainingDialogComponent } from './trainings/training-dialog/training-dialog.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { TrainingFormService } from './trainings/services/training-form.service';
import { TrainingDialogService } from './trainings/services/training-dialog.service';
import { DependentFormComponent } from './dependents/dependent-form/dependent-form.component';
import { DependentDialogComponent } from './dependents/dependent-dialog/dependent-dialog.component';
import { DependentListComponent } from './dependents/dependent-list/dependent-list.component';
import { DependentFormService } from './dependents/services/dependent-form.service';
import { DependentDialogService } from './dependents/services/dependent-dialog.service';
import { EmergencyContactFormComponent } from './emergency-contact-form/emergency-contact-form.component';
import { CardViewComponent } from './employee-views/card-view/card-view.component';
import { EmployeeCardComponent } from './employee-views/employee-card/employee-card.component';
import { EmployeeViewsComponent } from './employee-views/employee-views.component';
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeSearchFormComponent,
    LeaveAllowancesComponent,
    ExperienceFormComponent,
    ExperienceDialogComponent,
    ExperienceListComponent,
    EducationFormComponent,
    EducationDialogComponent,
    EducationListComponent,
    TrainingFormComponent,
    TrainingDialogComponent,
    TrainingListComponent,
    DependentFormComponent,
    DependentDialogComponent,
    DependentListComponent,
    EmergencyContactFormComponent,
    CardViewComponent,
    EmployeeCardComponent,
    EmployeeViewsComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialCompModule,
    ReactiveFormsModule,
    SharedModule,
    InfiniteScrollModule
  ],
  providers: [
    DATEPICKER_PROVIDER,
    PaginationHistoryService,
    ExperienceDialogService,
    ExperienceFormService,
    EducationFormService,
    EducationDialogService,
    TrainingFormService,
    TrainingDialogService,
    DependentFormService,
    DependentDialogService,
  ]
})
export class EmployeeModule { }

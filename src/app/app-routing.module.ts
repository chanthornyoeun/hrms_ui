import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'positions',
        loadChildren: () => import('./modules/position/position.module').then(m => m.PositionModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'leave-types',
        loadChildren: () => import('./modules/leave-management/leave-type/leave-type.module').then(m => m.LeaveTypeModule)
      },
      {
        path: 'dependent-types',
        loadChildren: () => import('./modules/dependent-type/dependent-type.module').then(m => m.DependentTypeModule)
      },
      {
        path: 'holiday-groups',
        loadChildren: () => import('./modules/holiday-management/holiday-group/holiday-group.module').then(m => m.HolidayGroupModule)
      },
      {
        path: 'holidays',
        loadChildren: () => import('./modules/holiday-management/holiday/holiday.module').then(m => m.HolidayModule)
      },
      {
        path: 'working-calendar',
        loadChildren: () => import('./modules/working-calendar/working-calendar.module').then(m => m.WorkingCalendarModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
      },
      { 
        path: 'leave-request',
        loadChildren: () => import('./modules/leave-management/leave-request/leave-request.module').then(m => m.LeaveRequestModule)
      },
      { 
        path: 'employee-leave',
        loadChildren: () => import('./modules/leave-management/leave-request/leave-request.module').then(m => m.LeaveRequestModule)
      },
      { 
        path: 'roles',
        loadChildren: () => import('./modules/user-management/role/role.module').then(m => m.RoleModule)
     }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

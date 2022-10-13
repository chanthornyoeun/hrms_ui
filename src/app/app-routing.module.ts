import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthlessGuard } from './core/guards/authless.guard';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'positions',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/position/position.module').then(m => m.PositionModule)
      },
      {
        path: 'departments',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'leave-types',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/leave-management/leave-type/leave-type.module').then(m => m.LeaveTypeModule)
      },
      {
        path: 'dependent-types',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/dependent-type/dependent-type.module').then(m => m.DependentTypeModule)
      },
      {
        path: 'holiday-groups',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/holiday-management/holiday-group/holiday-group.module').then(m => m.HolidayGroupModule)
      },
      {
        path: 'holidays',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/holiday-management/holiday/holiday.module').then(m => m.HolidayModule)
      },
      {
        path: 'working-calendar',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/working-calendar/working-calendar.module').then(m => m.WorkingCalendarModule)
      },
      {
        path: 'employees',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'leave-request',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/leave-management/leave-request/leave-request.module').then(m => m.LeaveRequestModule),
        data: {
          params: { selfLeave: 1 },
          url: '/leave-request',
          breadcrumb: 'Leave Request'
        }
      },
      {
        path: 'employee-leave',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/leave-management/leave-request/leave-request.module').then(m => m.LeaveRequestModule),
        data: {
          params: { reportToMe: 1 },
          url: '/employee-leave',
          breadcrumb: 'Employee Leave'
        }
      },
      {
        path: 'daily-attendant',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/daily-attendant/daily-attendant.module').then(m => m.DailyAttendantModule)
      },
      {
        path: 'roles',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/user-management/role/role.module').then(m => m.RoleModule)
      },
      {
        path: 'users',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/user-management/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'email-configure',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/configuration/email-configure/email-configure.module').then(m => m.EmailConfigureModule)
      },
      {
        path: 'page',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/page-management/page-management.module').then(m => m.PageManagementModule)
      },
      {
        path: 'unauthorized',
        loadChildren: () => import('./modules/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
      },
      {
        path: 'calendar',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/my-calendar/my-calendar.module').then(m => m.MyCalendarModule)
      },
      {
        path: 'notifications-config',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/configuration/notification-configure/notification-configure.module').then(m => m.NotificationConfigureModule)
      },
      {
        path: 'notifications',
        canActivate: [AuthorizationGuard],
        loadChildren: () => import('./modules/notification/notification.module').then(m => m.NotificationModule)
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthlessGuard],
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

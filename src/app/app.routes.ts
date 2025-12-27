import { Routes } from '@angular/router';

import { authCanActivateChild } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { employeeResolver } from './features/employees/employee-detail/employee.resolver';
import { ShellComponent } from './shared/ui/shell/sheel.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: 'login',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('./features/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: '',
    component: ShellComponent,
    canActivateChild: [authCanActivateChild],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.page').then(
            (m) => m.DashboardPage
          ),
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employees.page').then(
            (m) => m.EmployeesPage
          ),
      },
      {
        path: 'employees/new',
        loadComponent: () =>
          import('./features/employees/create/employee-create.page').then(
            (m) => m.EmployeeCreatePage
          ),
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import(
            './features/employees/employee-detail/employee-detail.page'
          ).then((m) => m.EmployeeDetailPage),
        resolve: {
          employee: employeeResolver,
        },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.page').then(
            (m) => m.SettingsPage
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];

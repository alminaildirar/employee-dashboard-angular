import { Routes } from '@angular/router';
import { ShellComponent } from './shared/ui/shell/sheel.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: '',
    component: ShellComponent,
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
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.page').then(
            (m) => m.SettingsPage
          ),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.page').then((m) => m.LoginPage),
  },

  { path: '**', redirectTo: 'dashboard' },
];

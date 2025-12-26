import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee, EmployeesApi } from '../../core/services/employees.api';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.page.html',
  styleUrl: './employees.page.scss',
})
export class EmployeesPage {
  private readonly api = inject(EmployeesApi);

  readonly isLoading = signal(true);
  readonly error = signal('');
  readonly employees = signal<Employee[]>([]);

  constructor() {
    this.load();
  }

  load() {
    this.isLoading.set(true);
    this.error.set('');

    this.api.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Employees could not be loaded.');
        this.isLoading.set(false);
      },
    });
  }
}

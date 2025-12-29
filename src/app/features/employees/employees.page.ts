import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeesStore } from '../../core/services/employee.store';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.page.html',
  styleUrl: './employees.page.scss',
})
export class EmployeesPage {
  readonly store = inject(EmployeesStore);

  constructor() {
    if (this.store.employees().length === 0) {
      this.store.refresh();
    }
  }
}

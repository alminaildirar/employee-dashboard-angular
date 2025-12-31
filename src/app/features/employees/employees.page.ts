import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeesStore } from '../../core/services/employee.store';
import { AutofocusDirective } from '../../shared/directives/autofocus.directive';
import { HighlightOnHoverDirective } from '../../shared/directives/highlight-on-hover.directive';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    HighlightOnHoverDirective,
    AutofocusDirective,
    InitialsPipe,
  ],
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

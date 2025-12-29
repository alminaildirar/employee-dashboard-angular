import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Employee } from '../../../core/mock/employees.mock';
import { EmployeesStore } from '../../../core/services/employee.store';
import { EmployeesApi } from '../../../core/services/employees.api';
import { NotificationStore } from '../../../core/services/notification.store';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-detail.page.html',
  styleUrl: './employee-detail.page.scss',
})
export class EmployeeDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(EmployeesApi);
  private readonly store = inject(EmployeesStore);
  private readonly toast = inject(NotificationStore);
  private readonly router = inject(Router);

  readonly employee = toSignal<Employee | null>(
    this.route.data.pipe(
      map((d) => (d['employee'] as Employee | null) ?? null)
    ),
    { initialValue: null }
  );

  deleteEmployee() {
    const e = this.employee();
    if (!e) return;

    const ok =
      typeof window === 'undefined'
        ? true
        : window.confirm('Delete this employee?');
    if (!ok) return;

    this.api.delete(e.id).subscribe({
      next: async () => {
        this.toast.show('Employee deleted', 'success');
        this.store.refresh();
        await this.router.navigate(['/employees']);
      },
      error: () => this.toast.show('Could not delete employee', 'error'),
    });
  }
}

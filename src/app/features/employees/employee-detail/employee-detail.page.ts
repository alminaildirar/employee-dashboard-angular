import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EmployeesStore } from '../../../core/services/employee.store';
import { Employee, EmployeesApi } from '../../../core/services/employees.api';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-detail.page.html',
  styleUrl: './employee-detail.page.scss',
})
export class EmployeeDetailPage {
  private readonly store = inject(EmployeesStore);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(EmployeesApi);

  readonly isLoading = signal(true);
  readonly error = signal('');

  readonly employee = toSignal<Employee | null>(
    this.route.paramMap.pipe(
      map((p) => p.get('id')!),
      tap(() => {
        this.isLoading.set(true);
        this.error.set('');
      }),
      switchMap((id) => {
        const cached = this.store.getByIdFromCache(id);
        if (cached) return of(cached);

        return this.api.getById(id).pipe(
          map((emp) => emp ?? null),
          catchError(() => {
            this.error.set('Employee not found.');
            return of(null);
          })
        );
      }),
      tap(() => this.isLoading.set(false))
    ),
    { initialValue: null }
  );
}

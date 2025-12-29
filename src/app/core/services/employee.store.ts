import { Injectable, computed, inject, signal } from '@angular/core';
import { Employee, EmployeesApi } from './employees.api';

type RoleFilter = 'all' | Employee['role'];
type StatusFilter = 'all' | Employee['status'];
type SortBy = 'name' | 'role' | 'status';

@Injectable({ providedIn: 'root' })
export class EmployeesStore {
  private readonly api = inject(EmployeesApi);

  // =========================
  // Server state
  // =========================
  readonly employees = signal<Employee[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string>('');

  // =========================
  // UI state (search/filter/sort)
  // =========================
  readonly query = signal<string>('');
  readonly roleFilter = signal<RoleFilter>('all');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly sortBy = signal<SortBy>('name');

  // =========================
  // Derived state
  // =========================
  readonly filteredEmployees = computed(() => {
    const q = this.query().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();
    const sortBy = this.sortBy();

    let list = this.employees();

    if (q) {
      list = list.filter((e) =>
        `${e.fullName} ${e.email}`.toLowerCase().includes(q)
      );
    }

    if (role !== 'all') list = list.filter((e) => e.role === role);
    if (status !== 'all') list = list.filter((e) => e.status === status);

    // Always sort a copy (do not mutate original signal array)
    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
      if (sortBy === 'role') return a.role.localeCompare(b.role);
      return a.status.localeCompare(b.status);
    });

    return sorted;
  });

  readonly count = computed(() => this.filteredEmployees().length);

  // =========================
  // Actions
  // =========================
  refresh(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.api.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        // error interceptor toast basıyor; burada UI mesajı yeterli
        console.error('[EmployeesStore.refresh] error', err);
        this.error.set('Employees could not be loaded.');
        this.isLoading.set(false);
      },
    });
  }

  clearFilters(): void {
    this.query.set('');
    this.roleFilter.set('all');
    this.statusFilter.set('all');
    this.sortBy.set('name');
  }
}

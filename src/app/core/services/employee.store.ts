import { Injectable, computed, signal } from '@angular/core';
import { Employee, EmployeesApi } from './employees.api';

@Injectable({ providedIn: 'root' })
export class EmployeesStore {
  private readonly _refreshTick = signal(0);

  private readonly _isLoading = signal(true);
  private readonly _error = signal('');
  private readonly _employees = signal<Employee[]>([]);

  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly employees = computed(() => this._employees());

  constructor(private readonly api: EmployeesApi) {
    this.refresh();
  }

  refresh() {
    this._refreshTick.update((v) => v + 1);
    this._isLoading.set(true);
    this._error.set('');

    this.api.getAll().subscribe({
      next: (data) => {
        this._employees.set(data);
        this._isLoading.set(false);
      },
      error: () => {
        this._error.set('Employees could not be loaded.');
        this._isLoading.set(false);
      },
    });
  }

  getByIdFromCache(id: string): Employee | undefined {
    return this._employees().find((e) => e.id === id);
  }
}

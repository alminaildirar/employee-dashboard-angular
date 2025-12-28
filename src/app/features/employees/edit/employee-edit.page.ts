import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes.guard';
import { Employee, EmployeesApi } from '../../../core/services/employees.api';

import { EmployeesStore } from '../../../core/services/employee.store';
import { NotificationStore } from '../../../core/services/notification.store';
import { emailAvailableValidator } from '../create/validators/email-available.validator';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-edit.page.html',
  styleUrl: './employee-edit.page.scss',
})
export class EmployeeEditPage implements HasUnsavedChanges {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(EmployeesApi);
  private readonly store = inject(EmployeesStore);
  private readonly router = inject(Router);
  private readonly toast = inject(NotificationStore);

  private readonly currentEmail = signal<string>('');

  readonly employee = toSignal<Employee | null>(
    this.route.data.pipe(
      map((d) => (d['employee'] as Employee | null) ?? null)
    ),
    { initialValue: null }
  );

  readonly form = this.fb.group({
    fullName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [
        emailAvailableValidator(this.api, {
          currentEmail: this.currentEmail(),
        }),
      ],
      updateOn: 'blur',
    }),
    role: this.fb.control<Employee['role']>('Engineer', {
      validators: [Validators.required],
    }),
    status: this.fb.control<Employee['status']>('ACTIVE', {
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const e = this.employee();
      if (!e) return;

      this.currentEmail.set(e.email);

      this.form.controls.email.clearAsyncValidators();
      this.form.controls.email.addAsyncValidators(
        emailAvailableValidator(this.api, { currentEmail: e.email })
      );

      this.form.patchValue({
        fullName: e.fullName,
        email: e.email,
        role: e.role,
        status: e.status,
      });

      this.form.markAsPristine();
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  async submit() {
    const e = this.employee();
    if (!e) return;

    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    this.api.update(e.id, payload).subscribe({
      next: async () => {
        this.toast.show('Employee updated', 'success');
        this.store.refresh();
        this.form.markAsPristine();
        await this.router.navigate(['/employees', e.id]);
      },
      error: () => {
        this.toast.show('Could not update employee', 'error');
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeesApi } from '../../../core/services/employees.api';
import { NotificationStore } from '../../../core/services/notification.store';
import { emailAvailableValidator } from './validators/email-available.validator';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-create.page.html',
  styleUrl: './employee-create.page.scss',
})
export class EmployeeCreatePage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly api = inject(EmployeesApi);
  private readonly router = inject(Router);
  private readonly toast = inject(NotificationStore);

  readonly form = this.fb.group({
    fullName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailAvailableValidator(this.api)],
      updateOn: 'blur',
    }),
    role: this.fb.control<'Engineer' | 'Manager' | 'HR'>('Engineer', {
      validators: [Validators.required],
    }),
    status: this.fb.control<'ACTIVE' | 'INACTIVE'>('ACTIVE', {
      validators: [Validators.required],
    }),
  });

  get emailCtrl() {
    return this.form.controls.email;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    this.api.create(payload).subscribe({
      next: async () => {
        this.toast.show('Employee created', 'success');
        await this.router.navigate(['/employees']);
      },
      error: () => {
        this.toast.show('Could not create employee', 'error');
      },
    });
  }
}

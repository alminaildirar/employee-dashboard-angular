import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/services/auth.store';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  isSubmitting = false;
  error = '';

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  async onSubmit() {
    this.error = '';
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const { email, password } = this.form.getRawValue();

    const ok = await this.auth.login(email, password);
    this.isSubmitting = false;

    if (!ok) {
      this.error = 'Invalid credentials';
      return;
    }

    await this.router.navigate(['/dashboard']);
  }
}

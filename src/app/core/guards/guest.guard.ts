import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

export const guestGuard: CanMatchFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return true;

  router.navigate(['/dashboard']);
  return false;
};

import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';

function checkAuth(): boolean {
  const auth = inject(AuthStore);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  router.navigate(['/login']);
  return false;
}

// Private sayfalar için
export const authCanActivate: CanActivateFn = () => checkAuth();
export const authCanActivateChild: CanActivateChildFn = () => checkAuth();

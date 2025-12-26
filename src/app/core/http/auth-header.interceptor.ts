import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../services/auth.store';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);

  if (!auth.isLoggedIn()) return next(req);

  const token = `demo-token:${auth.user()?.id ?? 'unknown'}`;

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  );
};

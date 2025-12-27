import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationStore } from '../services/notification.store';

function buildMessage(err: HttpErrorResponse): string {
  const body: any = err.error;

  if (body?.message && typeof body.message === 'string') return body.message;

  if (err.status === 0) return 'Network error. Please check your connection.';
  if (err.status >= 500) return 'Server error. Please try again later.';
  if (err.status === 404) return 'Not found.';
  if (err.status === 401) return 'Unauthorized.';
  if (err.status === 403) return 'Forbidden.';

  return 'Request failed.';
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(NotificationStore);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        console.error('[HTTP ERROR]', {
          url: err.url,
          status: err.status,
          message: err.message,
          error: err.error,
        });

        toast.show(buildMessage(err), 'error', 3000);
      } else {
        console.error('[UNKNOWN ERROR]', err);
        toast.show('Unexpected error occurred.', 'error', 3000);
      }

      return throwError(() => err);
    })
  );
};

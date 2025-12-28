import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { EmployeesApi } from '../../../../core/services/employees.api';

export function emailAvailableValidator(
  api: EmployeesApi,
  opts?: { currentEmail?: string }
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value = String(control.value ?? '')
      .trim()
      .toLowerCase();
    const currentEmail = (opts?.currentEmail ?? '').trim().toLowerCase();

    if (!value || control.hasError('email')) return of(null);
    if (currentEmail && value === currentEmail) return of(null); // ✅ ignore self

    return timer(300).pipe(
      switchMap(() => api.checkEmailAvailable(value)),
      map((res) => {
        if (res && typeof res.available === 'boolean') {
          return res.available
            ? null
            : ({ emailTaken: true } as ValidationErrors);
        }
        return null;
      }),
      catchError(() => of(null))
    );
  };
}

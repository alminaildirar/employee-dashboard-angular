import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { EmployeesApi } from '../../../../core/services/employees.api';

export function emailAvailableValidator(api: EmployeesApi): AsyncValidatorFn {
  return (control: AbstractControl): any => {
    const raw = String(control.value ?? '')
      .trim()
      .toLowerCase();
    if (!raw) return of(null);

    // debounce
    return timer(300).pipe(
      switchMap(() => api.checkEmailAvailable(raw)),
      map((res) =>
        res.available ? null : ({ emailTaken: true } satisfies ValidationErrors)
      ),
      catchError(() => of(null))
    );
  };
}

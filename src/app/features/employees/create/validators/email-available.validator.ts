import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { EmployeesApi } from '../../../../core/services/employees.api';

export function emailAvailableValidator(api: EmployeesApi): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value = String(control.value ?? '')
      .trim()
      .toLowerCase();

    if (!value || control.hasError('email')) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() => api.checkEmailAvailable(value)),
      map((res) =>
        res.available ? null : ({ emailTaken: true } as ValidationErrors)
      ),
      catchError(() => of(null))
    );
  };
}

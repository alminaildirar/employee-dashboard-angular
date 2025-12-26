import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { Employee, EMPLOYEES } from '../../../core/mock/employees.mock';

export const employeeResolver: ResolveFn<Employee | null> = (route) => {
  const id = route.paramMap.get('id')!;
  const emp = EMPLOYEES.find((e) => e.id === id) ?? null;
  return of(emp);
};

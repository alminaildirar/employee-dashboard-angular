import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Employee, EmployeesApi } from '../../../core/services/employees.api';

export const employeeResolver: ResolveFn<Employee> = (route) => {
  const api = inject(EmployeesApi);
  const id = route.paramMap.get('id')!;
  return api.getById(id);
};

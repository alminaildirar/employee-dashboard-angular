import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export type Employee = {
  id: string;
  fullName: string;
  email: string;
  role: 'Engineer' | 'Manager' | 'HR';
  status: 'ACTIVE' | 'INACTIVE';
};

export type CreateEmployeeInput = {
  fullName: string;
  email: string;
  role: Employee['role'];
  status: Employee['status'];
};

export type UpdateEmployeeInput = CreateEmployeeInput;

@Injectable({ providedIn: 'root' })
export class EmployeesApi {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Employee[]>('/api/employees');
  }

  getById(id: string) {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }

  create(input: CreateEmployeeInput) {
    return this.http.post<Employee>('/api/employees', input);
  }

  update(id: string, input: UpdateEmployeeInput) {
    return this.http.put<Employee>(`/api/employees/${id}`, input);
  }

  delete(id: string) {
    return this.http.delete<void>(`/api/employees/${id}`);
  }

  checkEmailAvailable(email: string) {
    return this.http.get<{ available: boolean }>('/api/employees/check-email', {
      params: { email },
    });
  }
}

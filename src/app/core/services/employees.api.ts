import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export type Employee = {
  id: string;
  fullName: string;
  email: string;
  role: 'Engineer' | 'Manager' | 'HR';
  status: 'ACTIVE' | 'INACTIVE';
};

@Injectable({ providedIn: 'root' })
export class EmployeesApi {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Employee[]>('/api/employees');
  }

  getById(id: string) {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }
}

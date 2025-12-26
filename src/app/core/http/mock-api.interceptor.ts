import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

type EmployeeDto = {
  id: string;
  fullName: string;
  email: string;
  role: 'Engineer' | 'Manager' | 'HR';
  status: 'ACTIVE' | 'INACTIVE';
};

const EMPLOYEES: EmployeeDto[] = [
  {
    id: 'e1',
    fullName: 'Rachel Green',
    email: 'rachel@demo.dev',
    role: 'Engineer',
    status: 'ACTIVE',
  },
  {
    id: 'e2',
    fullName: 'Chandler Bing',
    email: 'chandler@demo.dev',
    role: 'Manager',
    status: 'ACTIVE',
  },
  {
    id: 'e3',
    fullName: 'Joey Tribbiani',
    email: 'joey@demo.dev',
    role: 'HR',
    status: 'INACTIVE',
  },
];

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) return next(req);

  // GET /api/employees
  if (req.method === 'GET' && req.url === '/api/employees') {
    return of(
      new HttpResponse({
        status: 200,
        body: EMPLOYEES,
      })
    ).pipe(delay(350));
  }

  // GET /api/employees/:id
  if (req.method === 'GET' && req.url.startsWith('/api/employees/')) {
    const id = req.url.split('/').pop()!;
    const emp = EMPLOYEES.find((e) => e.id === id);

    return of(
      new HttpResponse({
        status: emp ? 200 : 404,
        body: emp ?? { message: 'Not Found' },
      })
    ).pipe(delay(250));
  }

  return next(req);
};

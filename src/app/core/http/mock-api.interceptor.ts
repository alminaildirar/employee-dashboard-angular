import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Employee, EMPLOYEES } from '../mock/employees.mock';

function getPath(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  }
  return url;
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const path = getPath(req.url);

  // Sadece /api/* isteklerini mock'la
  if (!path.startsWith('/api/')) return next(req);

  /**
   * ✅ 1) GET /api/employees/check-email?email=...
   * IMPORTANT: Bu handler, /api/employees/:id handler'ından ÖNCE gelmeli.
   * Yoksa "check-email" yanlışlıkla ":id" sanılabilir.
   */
  if (req.method === 'GET' && path === '/api/employees/check-email') {
    const url = new URL(req.urlWithParams, 'http://localhost');
    const email = (url.searchParams.get('email') ?? '').toLowerCase().trim();

    const exists = EMPLOYEES.some((e) => e.email.toLowerCase() === email);

    return of(
      new HttpResponse({
        status: 200,
        body: { available: !exists },
      })
    ).pipe(delay(250));
  }

  /**
   * ✅ 2) GET /api/employees
   */
  if (req.method === 'GET' && path === '/api/employees') {
    return of(
      new HttpResponse({
        status: 200,
        body: EMPLOYEES,
      })
    ).pipe(delay(250));
  }

  /**
   * ✅ 3) GET /api/employees/:id
   */
  if (req.method === 'GET' && path.startsWith('/api/employees/')) {
    const id = path.split('/').pop()!;

    // ekstra güvenlik: check-email buraya düşmesin
    if (id === 'check-email') {
      return of(
        new HttpResponse({
          status: 400,
          body: { message: 'Bad request' },
        })
      ).pipe(delay(100));
    }

    const emp = EMPLOYEES.find((e) => e.id === id);

    return of(
      new HttpResponse({
        status: emp ? 200 : 404,
        body: emp ?? { message: 'Not Found' },
      })
    ).pipe(delay(250));
  }

  /**
   * ✅ 4) POST /api/employees
   */
  if (req.method === 'POST' && path === '/api/employees') {
    const body = req.body as Partial<Employee>;

    const fullName = String(body.fullName ?? '').trim();
    const email = String(body.email ?? '')
      .toLowerCase()
      .trim();
    const role = (body.role ?? 'Engineer') as Employee['role'];
    const status = (body.status ?? 'ACTIVE') as Employee['status'];

    if (!fullName) {
      return of(
        new HttpResponse({
          status: 400,
          body: { message: 'Full name is required' },
        })
      ).pipe(delay(200));
    }

    if (!email) {
      return of(
        new HttpResponse({
          status: 400,
          body: { message: 'Email is required' },
        })
      ).pipe(delay(200));
    }

    const exists = EMPLOYEES.some((e) => e.email.toLowerCase() === email);
    if (exists) {
      return of(
        new HttpResponse({
          status: 409,
          body: { message: 'Email already exists' },
        })
      ).pipe(delay(200));
    }

    const newEmp: Employee = {
      id: `e${EMPLOYEES.length + 1}`,
      fullName,
      email,
      role,
      status,
    };

    EMPLOYEES.push(newEmp);

    return of(
      new HttpResponse({
        status: 201,
        body: newEmp,
      })
    ).pipe(delay(250));
  }

  // Diğer tüm /api istekleri fallback
  return next(req);
};

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { EMPLOYEES } from '../mock/employees.mock';

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

  if (!path.startsWith('/api/')) return next(req);

  if (req.method === 'GET' && path === '/api/employees') {
    return of(new HttpResponse({ status: 200, body: EMPLOYEES })).pipe(
      delay(250)
    );
  }

  if (req.method === 'GET' && path.startsWith('/api/employees/')) {
    const id = path.split('/').pop()!;
    const emp = EMPLOYEES.find((e) => e.id === id);

    return of(
      new HttpResponse({
        status: emp ? 200 : 404,
        body: emp ?? { message: 'Not Found' },
      })
    ).pipe(delay(200));
  }

  // GET /api/employees/check-email?email=...
  if (req.method === 'GET' && path === '/api/employees/check-email') {
    const email = (req.params.get('email') ?? '').toLowerCase().trim();
    const exists = EMPLOYEES.some((e) => e.email.toLowerCase() === email);

    return of(
      new HttpResponse({
        status: 200,
        body: { available: !exists },
      })
    ).pipe(delay(250));
  }

  // POST /api/employees
  if (req.method === 'POST' && path === '/api/employees') {
    const body = req.body as any;

    const email = String(body?.email ?? '')
      .toLowerCase()
      .trim();
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

    const newEmp = {
      id: `e${EMPLOYEES.length + 1}`,
      fullName: String(body?.fullName ?? '').trim(),
      email,
      role: body?.role ?? 'Engineer',
      status: body?.status ?? 'ACTIVE',
    };

    EMPLOYEES.push(newEmp);

    return of(new HttpResponse({ status: 201, body: newEmp })).pipe(delay(250));
  }

  return next(req);
};

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

  return next(req);
};

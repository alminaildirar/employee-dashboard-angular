import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authHeaderInterceptor } from './core/http/auth-header.interceptor';
import { errorInterceptor } from './core/http/error.interceptor';
import { mockApiInterceptor } from './core/http/mock-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        mockApiInterceptor,
        authHeaderInterceptor,
        errorInterceptor,
      ])
    ),
  ],
};

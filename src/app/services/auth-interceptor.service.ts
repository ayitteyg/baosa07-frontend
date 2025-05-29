import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.includes('/token-auth/')) {
        return next.handle(req);  // Skip adding Authorization for login
      }

      const token = this.authService.getToken();
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Token ${token}`)
        });
        return next.handle(cloned);
      }
      return next.handle(req);
    }
}

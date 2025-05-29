import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = environment.apiUrl + '/token-auth/';
  private isAuthenticated = false;
  // private loginUrl = 'http://127.0.0.1:8000/api/token-auth/';

  constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string): Observable<any> {
      return this.http.post(this.loginUrl, { username, password }).pipe(
        tap((response: any) => {
          // Only set as logged in if API returns success
          if (response && response.token) {
            this.isAuthenticated = true;
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', username);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.isAuthenticated = false;
          return throwError(() => error);
        })
      );
    }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Check both local flag and token existence
    return this.isAuthenticated && !!localStorage.getItem('token');
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get user from localStorage
  getUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }


    getUserId(): number | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  }


  getMemberId(): number | null {
  const user = localStorage.getItem('currentUser');
  if (user) {
    try {
      return JSON.parse(user).id;
    } catch (e) {
      return null;
    }
  }
  return null;
}


}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = environment.apiUrl + '/token-auth/';
  // private loginUrl = 'http://127.0.0.1:8000/api/token-auth/';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})




export class MemberService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/`);
  }

  getMember(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/${id}/`);
  }

  createMember(memberData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/members/`, memberData);
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members-dashboard/summary/`);
  }
}

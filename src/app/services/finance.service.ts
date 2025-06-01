import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = environment.apiUrl;
 //private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL // Update with your Django API URL
  constructor(private http: HttpClient) {}

  getFinanceSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/finance-summary/`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
 private apiUrl = environment.apiUrl;
 //private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL // Update with your Django API URL

  constructor(
    private http: HttpClient,
    private notification: NotificationService

  ) { }

  getMemberReceipts(memberId: number): Observable<any> {
   return this.http.get(`${this.apiUrl}/receipts/member/${memberId}/`, {
   withCredentials: true
  });
  }

  getReceiptSummary(memberId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/receipts/summary/${memberId}/`, {
  withCredentials: true
  });
  }

  getMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/`);
  }



  
createReceipt(receiptData: any): Observable<any> {
  const payload = {
    member: +receiptData.member_id,  // 👈 cast to number
    receipt_date: new Date(receiptData.receipt_date).toISOString().split('T')[0],
    category: receiptData.category,
    amount: +receiptData.amount,
    detail: receiptData.detail
  };

  console.log('Sending payload:', payload);

  return this.http.post(`${this.apiUrl}/receipts/`, payload).pipe(
    catchError((error) => {
      console.error('Error creating receipt:', error.error);
      return throwError(() => error);
    })
  );
}

}

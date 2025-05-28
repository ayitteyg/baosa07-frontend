import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Create new payment
   createPayment(paymentData: any): Observable<any> {
  const payload = {
    payment_to: +paymentData.payment_to_id, // ensure it's numeric
    payment_date: new Date(paymentData.payment_date).toISOString().split('T')[0],
    amount: +paymentData.amount,
    payment_details: paymentData.payment_details
  };

  console.log('Sending payment payload:', payload);

  return this.http.post(`${this.apiUrl}/payments/`, payload).pipe(
    catchError((error) => {
      console.error('Error creating payment:', error.error);
      return throwError(() => error);
    })
  );
}

 


  // Get all payments
  getPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/`);
  }

  // Get single payment by ID
  getPayment(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/${id}/`);
  }

  // Update payment
  updatePayment(id: number, paymentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/payments/${id}/`, paymentData);
  }

  // Delete payment
  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/payments/${id}/`);
  }
}
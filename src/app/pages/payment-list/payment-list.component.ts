import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payments-list',
  standalone: false,
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})


export class PaymentListComponent implements OnInit {
  payments: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load payments', err);
        this.errorMessage = 'Failed to load payments. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return `GH₵ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}

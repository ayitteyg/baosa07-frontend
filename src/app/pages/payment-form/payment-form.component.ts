import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ReceiptService } from '../../services/receipt.service'; // Reusing member list
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-form',
  standalone: false,
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})



export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  members: any[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private receiptService: ReceiptService, // Reusing member list
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      payment_to_id: ['', Validators.required],
      payment_date: [this.today, Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      payment_details: ['']
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.receiptService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.error('Error loading members:', err);
      }
    });
  }

 onSubmit(): void {
  if (this.paymentForm.invalid) {
    return;
  }
  const formValue = this.paymentForm.value;
  // Log for debugging
  console.log('Form value:', formValue);

  this.paymentService.createPayment(formValue).subscribe({
    next: (res) => {
      console.log('Payment created:', res);
      this.paymentForm.reset(); // optional
    },
    error: (err) => {
      console.error('Error submitting payment:', err);
    }
  });
}

}

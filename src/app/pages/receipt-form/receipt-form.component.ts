import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-receipt-form',
  standalone: false,
  templateUrl: './receipt-form.component.html',
  styleUrl: './receipt-form.component.css'
})


export class ReceiptFormComponent implements OnInit {
  receiptForm: FormGroup;
  categories = [
    { value: 'dues', label: 'Dues' },
    { value: 'seed_fund', label: 'Seed Fund' },
    { value: 'contribution', label: 'Contribution' }
  ];
  members: any[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private router: Router
  ) {
    this.receiptForm = this.fb.group({
      member_id: ['', Validators.required],
      receipt_date: [this.today, Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      detail: ['']
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
    if (this.receiptForm.valid) {
      this.receiptService.createReceipt(this.receiptForm.value).subscribe({
        next: (response) => {
          alert('Receipt submitted successfully!');
          this.router.navigate(['/receipts']);
        },
        
        error: (err) => {
          console.error('Error submitting receipt:', err);
          alert('Error submitting receipt. Please try again.');
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-receipts-dashboard',
  standalone: false,
  templateUrl: './receipts-dashboard.component.html',
  styleUrl: './receipts-dashboard.component.css'
})



export class ReceiptsDashboardComponent implements OnInit {
  summary: any = {
    seed_fund: 0,
    dues: 0,
    contribution: 0
  };

  receiptsByYear: any[] = [];
  isLoading = true;
  memberId: number | null = null;

  constructor(
    private receiptService: ReceiptService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Safely get memberId from auth service
    this.memberId = this.authService.getUserId();

    if (this.memberId) {
      this.loadData();
    } else {
      console.error('No memberId found. User might not be logged in.');
      this.isLoading = false;
    } 
  }

  loadData(): void {
    this.receiptService.getReceiptSummary(this.memberId!).subscribe({
      next: (data) => {
        this.summary = data;
        console.log(data)
        this.loadReceipts();
      },
      error: (err) => {
        console.error('Error loading summary:', err);
        this.isLoading = false;
      }
    });
  }

  loadReceipts(): void {
    this.receiptService.getMemberReceipts(this.memberId!).subscribe({
      next: (data) => {
        this.receiptsByYear = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading receipts:', err);
        this.isLoading = false;
      }
    });
  }

 
  formatCurrency(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) {
    return 'GH₵ 0.00';
  }
  return `GH₵ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}



}

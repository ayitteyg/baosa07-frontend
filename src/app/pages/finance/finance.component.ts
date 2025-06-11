import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-finance',
  standalone: false,
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})


export class FinanceComponent implements OnInit {
  summary: any = {};
  total_payments : number = 0;
  yearlyReceipts: any[] = [];
  paymentsDetails: any[] = [];
  currentBalance: number = 0;
  showYearly: { [key: string]: boolean } = {};
  isLoading = true;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.financeService.getFinanceSummary().subscribe({
      next: (data) => {
        this.summary = data.summary;
        this.total_payments = data.total_payments;
        console.log(this.summary)
        this.yearlyReceipts = data.yearly_receipts;
        this.paymentsDetails = data.payments_details;
        this.currentBalance = data.current_balance;
        this.isLoading = false
      },
      
      error: (err) => console.error('Failed to load finance summary:', err)
    }
  
  );

    
  }

  toggleYearly(category: string) {
    this.showYearly[category] = !this.showYearly[category];
  }


  formatCurrency(amount: number): string {
  return 'GH₵ ' + (amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

}
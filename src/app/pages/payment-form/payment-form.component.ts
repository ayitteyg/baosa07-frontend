import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ReceiptService } from '../../services/receipt.service'; // For fetching members
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-payments-form',
  standalone: false,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  memberSearchControl = new FormControl('');
  members: any[] = [];
  filteredMembers: any[] = [];
  showDropdown = false;
  searchTerm: string = "";
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private receiptService: ReceiptService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupSearch();
    this.loadMembers();
  }

  // Initialize form group
  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      payment_to: ['', Validators.required],
      payment_date: [this.today, Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      payment_details: ['']
    });
  }

  // Set up search control
  private setupSearch(): void {
    this.memberSearchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((searchTerm: string | null) => {
      this.filterMembers(searchTerm || '');
    });
      }

  // Load members list
  private loadMembers(): void {
    this.receiptService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.error('Error loading members:', err);
        this.notification.showError('Failed to load members');
      }
    });
  }

  // Filter members based on search
  filterMembers(searchTerm: string): void {
    const lowerTerm = searchTerm.toLowerCase();
    this.filteredMembers = this.members.filter(member =>
      member.name.toLowerCase().includes(lowerTerm)
    );
  }

  // Handle selection from dropdown
  selectMember(member: any): void {
    this.paymentForm.patchValue({ payment_to: member.id });
    this.memberSearchControl.setValue(member.name);
    this.showDropdown = false;
  }

  // Delay hiding dropdown so click can register
  hideDropdownWithDelay(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  // Handle form submit
  onSubmit(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    const formValue = this.paymentForm.value;
    this.paymentService.createPayment(formValue).subscribe({
      next: (res) => {
        this.notification.showSuccess('Payment created successfully!');
        this.paymentForm.reset();
        this.memberSearchControl.reset();
        this.filteredMembers = [];
      },
      error: (err) => {
        console.error('Error submitting payment:', err);
        this.notification.showError('Failed to create payment. Please try again.');
      }
    });

      this.memberSearchControl.reset();
      this.filteredMembers = [];
  }

  

}

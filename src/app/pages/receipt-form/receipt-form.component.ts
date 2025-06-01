import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { NotificationService } from '../../services/notification.service';
import { debounceTime } from 'rxjs/operators';

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
  memberSearchControl = new FormControl('');
  filteredMembers: any[] = [];
  showDropdown = false;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private router: Router, 
    private notification: NotificationService
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
    this.memberSearchControl.valueChanges
  .pipe(debounceTime(200))
  .subscribe((searchTerm: string | null) => {
    this.filterMembers(searchTerm || '');
  });
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
         // alert('Receipt submitted successfully!');
          this.notification.showSuccess('Receipt created successfully!');
          this.router.navigate(['/receipts']);
        },
        
        error: (err) => {
          console.error('Error submitting receipt:', err);
         // alert('Error submitting receipt. Please try again.');
           this.notification.showError('Failed to create receipt. Please try again.');
        }
      });
    }

     this.memberSearchControl.reset();
    this.filteredMembers = [];
  }


  filterMembers(searchTerm: string): void {
  const lowerTerm = searchTerm.toLowerCase();
  this.filteredMembers = this.members.filter(member =>
    member.name.toLowerCase().includes(lowerTerm)
  );
}

selectMember(member: any): void {
  this.receiptForm.patchValue({ member_id: member.id });
  this.memberSearchControl.setValue(member.name);
  this.showDropdown = false;
}

hideDropdownWithDelay(): void {
  setTimeout(() => {
    this.showDropdown = false;
  }, 200);
}

  
}

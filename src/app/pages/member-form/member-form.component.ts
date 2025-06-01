import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-member-form',
  standalone: false,
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css'
})
export class MemberFormComponent implements OnInit{

  memberForm: FormGroup;
  members: any[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private memberservice: MemberService,
    private notification: NotificationService
  ) 
  {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      contact: ['', Validators.required],
      location: [''],
      work: [''],
      marital_status: [''],
      next_of_kin: [''],
      next_of_kin_cont: [''],
      category: ['member', Validators.required],
  
    });
  }


   ngOnInit(): void {
    this.loadMembers();
  }

    loadMembers(): void {
    this.memberservice.getMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.error('Error loading members:', err);
      }
    });
  }


  onSubmit(): void {
  if (this.memberForm.invalid) {
    return;
  }
  const formValue = this.memberForm.value;
  // Log for debugging
  console.log('Form value:', formValue);

  this.memberservice.createMember(formValue).subscribe({
    next: (res) => {
      console.log('member created:', res);
      this.notification.showSuccess('member Created successfully!');
      this.memberForm.reset(); // optional
    },
    error: (err) => {
      console.error('Error creating member:', err);
      this.notification.showError('Failed to create member. Please try again.');
    }
  });
}


}

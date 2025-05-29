import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service'; // Reusing member list
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-event-form',
  standalone: false,
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})


export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  members: any[] = [];
  eventTypes: any[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private receiptService: ReceiptService, // Reusing member list
    private router: Router,
    private notification: NotificationService
  ) {
    this.eventForm = this.fb.group({
      event_id: ['', Validators.required],
      member_id: ['', Validators.required],
      event_date: [this.today, Validators.required],
      event_description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadEventTypes();
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

  loadEventTypes(): void {
    this.eventService.getEventTypes().subscribe({
      next: (data) => this.eventTypes = data,
      error: (err) => console.error('Error loading event types', err)
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: () => {
          //alert('Event created successfully!');
          this.notification.showSuccess('Event Created successfully!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error creating event', err);
          //alert('Error creating event. Please try again.');
          this.notification.showSuccess('Error creating event. Please try again');
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service'; // Reusing member list
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';
import { debounceTime } from 'rxjs/operators';

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

  eventSearchControl = new FormControl('');
 filteredEventTypes: any[] = [];
  showEventDropdown = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private receiptService: ReceiptService, // Reusing member list
    private router: Router,
    private notification: NotificationService
  ) {
      this.eventForm = this.fb.group({
      event: ['', Validators.required],
      event_date: ['', Validators.required],
      event_description: ['', Validators.required],
      member: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadEventTypes();

    this.eventSearchControl.valueChanges
  .pipe(debounceTime(200))
  .subscribe((searchTerm: string | null) => {
    this.filterEventTypes(searchTerm || '');
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

  loadEventTypes(): void {
    this.eventService.getEventTypes().subscribe({
      next: (data) => this.eventTypes = data,
      error: (err) => console.error('Error loading event types', err)
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {

      console.log(this.eventForm)
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

    this.eventSearchControl.reset();
    this.filteredEventTypes = [];
  }


  filterEventTypes(searchTerm: string): void {
  const lowerTerm = searchTerm.toLowerCase();
  this.filteredEventTypes = this.eventTypes.filter(event =>
    event.name.toLowerCase().includes(lowerTerm)
  );
}

selectEventType(eventType: any): void {
  this.eventForm.patchValue({ event: eventType.id });
  this.eventSearchControl.setValue(eventType.name);
  this.showEventDropdown = false;
}

hideEventDropdownWithDelay(): void {
  setTimeout(() => {
    this.showEventDropdown = false;
  }, 200);
}


}
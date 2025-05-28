import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events/`, {
      event_id: eventData.event_id,
      event_date: eventData.event_date,
      event_description: eventData.event_description,
      member_id: eventData.member_id
    });
  }

  // Get all event types
  getEventTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/event-types/`);
  }

  // Create new event type
  createEventType(eventTypeData: {name: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/event-types/`, eventTypeData);
  }

  // Update event type
  updateEventType(id: number, eventTypeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/event-types/${id}/`, eventTypeData);
  }

  // Delete event type
  deleteEventType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/event-types/${id}/`);
  }
  
}
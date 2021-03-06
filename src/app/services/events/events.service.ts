import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Event {
  name: string;
  ownerId: string;
  description: string;
  organization: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvent(eventid: string): Observable<Event>{
	  return this.http.post<Event>(environment.host + '/api/events/getevent',{eventid: eventid});
  }  
  

  
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.host + '/api/events/getevents');
  }

  createEvent(name: String, description: String, organization: String, skills: String[]): Observable<Event> {
    const jwt =  localStorage.getItem('jwt-token');
    return this.http.post<Event>(environment.host + '/api/events/createevent', {
            name,
            description,
            organization,
            jwt,
            skills
          });
  }
  subscribeEvent(eventId) {
    const jwt = localStorage.getItem('jwt-token');
    return this.http.post<Event>(environment.host + '/api/events/subscribe',{
        jwt,
        eventId,
      }
    );
  }
}

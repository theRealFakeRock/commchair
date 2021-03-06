import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  constructor(private eventsService: EventsService, private appComponent : AppComponent, private router : Router) {
    eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
  events: any = [];

	public innerWidth: any;
  
	notMobile = true;
	
	
	ngOnInit() {
    this.innerWidth = window.innerWidth;
	if (this.innerWidth <= 400) this.notMobile = false;
  }
  subscribe(eventId) {
    console.log(eventId);
    this.eventsService.subscribeEvent(eventId).subscribe(e => console.log(e));
  }
	
	 
  
	
  
}

import { Component } from '@angular/core';
import { Event, EventService } from './event';
import { TypeaheadComponent } from './typeahead';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.template.html',
  styleUrls: ['./app/app.style.css'],
  providers: [EventService]
})
export class AppComponent {

  // Selected event.
  selectedEvent: Event = null;

  title = 'Angular 2 Event Searcher';

  events: Event[];

  constructor(private eventService: EventService) {
    this.events = eventService.findAllEvents();
  }

  onEventSent(data: any): void {
    console.debug(data);
  }

  onEventReceived(data : any): void {
    console.debug(data);
  }

  onEventSelected(data : any): void {
    this.selectedEvent = data as Event;
  }
}
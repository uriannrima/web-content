import { Injectable } from '@angular/core';
import { Event } from './';

const EVENTS: Event[] = [
    { id: 1, title: 'ASD Movie' },
    { id: 3, title: 'QWE Movie' },
    { id: 4, title: 'ZXC Movie' },
    { id: 2, title: 'FGH Movie' },
];

@Injectable()
export class EventService {
    /**
     * Return list of all events.
     */
    findAllEvents(): Event[] {
        return EVENTS;
    }
    /**
     * Return list of events that starts with parameter.
     * @param {String} beginning - Beginning of the event name.
     */
    findEventBeginsWith(beginning: string): Event[] {
        return EVENTS.slice(3);
    }
}
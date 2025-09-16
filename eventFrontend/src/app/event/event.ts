import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

//TODO rivedi tipi 
interface EventDetail {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  time: string;
}

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event {
  event: EventDetail = {
    title: 'Concerto Jazz sotto le Stelle',
    description: 'Una serata indimenticabile di jazz con i migliori artisti internazionali.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    location: 'Piazza Grande, Firenze',
    date: '15 Agosto 2025',
    image: 'assets/images/jazz-concert.jpg',
    time: '17:00-21:00'
  };

  onSignup(): void {
    console.log('Iscritto all’evento:', this.event.title);
    // TODO logica iscrizione
  }

  onOpenMap(): void {
    console.log('Apri mappa per:', this.event.location);
    // TODO collega mappa
  }
}

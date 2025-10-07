import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from './event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit{

  constructor(private route : ActivatedRoute, private eventService : EventService) {}

  event!: EventModel;

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (data) => this.event = data,
        error: (err) => console.error('Errore caricamento evento:', err)
      });
    }
  }


  /*
  event: EventDetail = {
    title: 'Concerto Jazz sotto le Stelle',
    description: 'Una serata indimenticabile di jazz con i migliori artisti internazionali.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    location: 'Piazza Grande, Firenze',
    date: '15 Agosto 2025',
    image: 'assets/images/jazz-concert.jpg',
    time: '17:00-21:00'
  };
  */

  onSignup(event: EventModel) {
    console.log('Iscritto all’evento:', event.eventName);
  }

  onOpenMap(event: EventModel) {

    // "https://www.google.com/maps/search/?q=@evento.Toponimo+@evento.Indirizzo,+@evento.Comune"
    
    if (event.address) {
      const url = `https://www.google.com/maps/search/?q=${event.toponimo}+${event.address},+${event.comune}`;
      window.open(url, '_blank');
    }
  }
}

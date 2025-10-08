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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from './event.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Navbar } from '../navbar/navbar';

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

  purchaseTicket(id: string) {
    this.eventService.purchaseTicket(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Iscrizione effettuata con successo',
        });
      },
      error: (error) => {
        console.error('Errore durante l\'iscrizione:', error);
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Si è verificato un errore durante l\'iscrizione all\'evento. Riprova più tardi.'
        });
      }
    });
  }

  eventOpenMap(event: EventModel) {
    
    if (event.address) {
      const url = `https://www.google.com/maps/search/?q=${event.toponimo}+${event.address},+${event.comune}`;
      window.open(url, '_blank');
    }
  }
}

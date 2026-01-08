import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from './event.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.html',
  styleUrls: ['./event.scss']
})
export class Event implements OnInit{

  isAuthenticated = false;

  constructor(private route : ActivatedRoute, private eventService : EventService, private authService : AuthService) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

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
    const thisEventId = Number(id);

    this.eventService.getUserTickets().subscribe({
      next: (tickets) => {
        console.log('Biglietti utente:', tickets);
        const alreadyPurchased = tickets.some((ticket: any) => ticket.eventId === thisEventId);
        
        if (alreadyPurchased) {
          Swal.fire({
          icon: 'error',
          title: 'Attenzione',
          text: 'Hai già acquistato un biglietto per questo evento (Max 1 per account).',
          iconColor: '#AF3E4D',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
        });
        return;
      }

      this.eventService.purchaseTicket(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Iscrizione effettuata con successo',
            iconColor: '#6bb95d',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#293B62',
          });
        },
        error: (error) => {
          console.error('Errore durante l\'iscrizione:', error);
          Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Si è verificato un errore durante l\'iscrizione all\'evento. Riprova più tardi.',
            iconColor: '#AF3E4D',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#293B62',
          });
        }
      });
    },
      error: () => {
        if(!this.isAuthenticated){
            Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Devi essere autenticato per acquistare un biglietto.',
            iconColor: '#AF3E4D',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#293B62',
          });
          return;
        }

        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Non è stato possibile verificare i biglietti dell\'utente. Riprova più tardi.',
          iconColor: '#AF3E4D',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
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

  exit(){
    window.history.back();
  }
}

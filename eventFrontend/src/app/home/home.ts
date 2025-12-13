import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit{

  isAuthenticated = false;

  events: EventModel[] = []; // Array per memorizzare gli eventi
  today = new Date();

  //Paginazione
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  paginatedEvents: EventModel[] = [];

  Math = Math;

  constructor(private authService : AuthService, private eventService: EventService, private router : Router) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '{}');

        this.events = data.filter(event => {
          const eventDate = new Date(event.startDate);
          event.isFavorite = !!favorites[event.id]; // Imposta lo stato dal localstorage
          return eventDate >= this.today;
        }); // Assegna i dati ricevuti all'array events e filtra per data
        
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePaginatedEvents();
      },
      error: (error) => {
        console.error('Errore caricamento eventi:', error);
      }
    });
  }

  updatePaginatedEvents() : void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  goToPage(page: number) : void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedEvents();
    }
  }

  // Pulsanti paginazione
  firstPage(): void {this.goToPage(1);}
  lastPage(): void {this.goToPage(this.totalPages);}
  nextPage(): void {this.goToPage(this.currentPage + 1);}
  previousPage(): void {this.goToPage(this.currentPage - 1);}

  onSelectEvent(id: string) {
    this.router.navigate(['/event', id]);
  }

  onSearchFilter(value: string) {
    if(!value) {
      this.loadEvents();
      return;
    }

    this.eventService.getEventsByName(value).subscribe({
      next: (data) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '{}');
        
        // Assegna i dati ricevuti all'array events e imposta lo stato dei preferiti
        this.events = data.map(event => {
          return {
            ...event,
            isFavorite: !!favorites[event.id] // Imposta lo stato dal localstorage
          };
        }); 

        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePaginatedEvents();
      },
      error: (NotFoundException) => {
        console.log("Nessun evento trovato con il filtro: " + value);
        this.events = [];
        this.totalPages = 0;
        this.updatePaginatedEvents();
      }
    });
  }

  toggleFavorite(event: EventModel, ev: MouseEvent): void {
    ev.stopPropagation();

    if(!this.isAuthenticated){
      Swal.fire({
          icon: 'error',
          title: 'Attenzione',
          text: 'Effettua l\'accesso per poter aggiungere ai preferiti.',
          iconColor: '#799851',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      return;
    }

    event.isFavorite = !event.isFavorite;

    // Salva lo stato del preferito per persistenza
    this.saveFavoriteStatus(event);
  }

  saveFavoriteStatus(event: EventModel): void {
    const favorites = JSON.parse(localStorage.getItem('favoriteEvents') || '{}');

    if (event.isFavorite) {
      favorites[event.id] = true;
    } else {
      delete favorites[event.id];
    }

    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }
}
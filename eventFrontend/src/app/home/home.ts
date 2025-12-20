import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
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
  favoriteEventsIds = new Set<number>();

  //Paginazione
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 0;
  paginatedEvents: EventModel[] = [];

  showOnlyFavorites: boolean = false;
  filteredEvents: EventModel[] = [];

  Math = Math;

  constructor(private authService : AuthService, private eventService: EventService, private router : Router) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      status => {
        this.isAuthenticated = status;
        this.loadEvents();
      }
    )
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data.filter(event => {
          const eventDate = new Date(event.startDate);
          return eventDate >= this.today;
        }); // Assegna i dati ricevuti all'array events e filtra per data
        
       this.applyFilterAndPagination();
       if(this.isAuthenticated) this.loadFavoriteEvents();
      },
      error: (error) => {
        console.error('Errore caricamento eventi:', error);
      }
    });
  }

  loadFavoriteEvents(): void {
    console.log('🚀 CHIAMO GET FAVORITES');
    this.eventService.getFavoriteEvents().subscribe({
      next: (favorites) => {
        console.log('✅ FAVORITI RICEVUTI', favorites);
        this.favoriteEventsIds = new Set(favorites.map((fav: any) => fav.eventId));
        this.markFavorites(); 
      },
      error: (error) => {
        console.error('Errore caricamento preferiti:', error);
        this.applyFilterAndPagination();
      }
    });
  }

  markFavorites() : void {
    this.events = this.events.map(event => ({
      ...event,
      isFavorite: this.favoriteEventsIds.has(Number(event.id))
    }));

    this.applyFilterAndPagination();
  }

  applyFilterAndPagination() : void {
    this.filteredEvents = this.showOnlyFavorites ? this.events.filter(e => e.isFavorite) : [...this.events];

    this.totalPages = this.Math.ceil(this.filteredEvents.length / this.pageSize);
    if(this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1; 
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents() : void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
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
        // Assegna i dati ricevuti all'array events e imposta lo stato dei preferiti
        this.events = data.map(event => {
          return {
            ...event,
            isFavorite: this.favoriteEventsIds.has(Number(event.id))
          };
        }); 

        this.applyFilterAndPagination();
      },
      error: () => {
        console.log("Nessun evento trovato con il filtro: " + value);
        this.events = [];
        this.applyFilterAndPagination();
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
          iconColor: '#864B4F',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      return;
    }

    event.isFavorite ? this.removeFromFavorites(event) : this.addToFavorites(event);
  }

  addToFavorites(event: EventModel) : void {
    const eventId = Number(event.id);

    this.eventService.addFavoriteEvent(eventId).subscribe({
      next: () => {
        event.isFavorite = true;
        this.favoriteEventsIds.add(eventId);
        this.applyFilterAndPagination();

        Swal.fire({
          icon: 'success',
          title: 'Evento aggiunto',
          text: 'L\'evento è stato aggiunto ai preferiti.',
          iconColor: '#799851',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      },
      error : () => {
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile aggiungere l\' evento ai preferiti.',
          iconColor: '#864B4F',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      }
    })
  }

  removeFromFavorites(event: EventModel) : void {
    const eventId = Number(event.id);

    this.eventService.removeFavoriteEvent(eventId).subscribe({
      next : () => {
        event.isFavorite = false;
        this.favoriteEventsIds.delete(eventId);
        this.applyFilterAndPagination();

        Swal.fire({
          icon: 'success',
          title: 'Evento rimosso',
          text: 'L\'evento è stato rimosso dai preferiti.',
          iconColor: '#799851',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      },
      error : () => {
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile rimuovere l\' evento dai preferiti.',
          iconColor: '#864B4F',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
      }
    })
  }

  onTogglefavoritesFilter(event: Event) : void {
    const input = event.target as HTMLInputElement;
    this.showOnlyFavorites = input.checked;
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }
}
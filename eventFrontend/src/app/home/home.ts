import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit{
  events: EventModel[] = []; // Array per memorizzare gli eventi

  //Paginazione
  currentPage: number = 1;
  pageSize: number = 15;
  totalPages: number = 0;
  paginatedEvents: EventModel[] = [];

  Math = Math;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data; // Assegna i dati ricevuti all'array events
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


  /*
  trackById(index: number, event: EventModel){
    return event.id;
  }
    */

  onSignup(event: EventModel) {
    console.log('Iscritto all’evento:', event.eventName);
  }

  onOpenMap(event: EventModel) {
    if (event.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.address
      )}`;
      window.open(url, '_blank');
    }
  }
}

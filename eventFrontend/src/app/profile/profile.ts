import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import Swal from 'sweetalert2';
import { TicketModel } from '../models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event/event.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {

  editing = false;

  user!: UserModel;
  formUser: UserModel = { ...this.user };

  tickets!: TicketModel[];

  @ViewChild('carousel', {static: false})
  carousel!: ElementRef<HTMLDivElement>;

  atStart = true;
  atEnd = false;

  constructor(private authService : AuthService, private profileService : ProfileService, 
    private router : Router, private route : ActivatedRoute, private eventService : EventService) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser != null) {
      try {
        this.user = currentUser;
        this.loadUserTickets();
        this.route.queryParams.subscribe(params => {
        if(params['editing'] === 'true') this.startEditing();
    });
      } catch (error) {
        console.error('Errore nel parsing dell\'utente dal sessionStorage:', error);
      }
    } else {
      console.warn('Nessun utente trovato nel sessionStorage.');
    }
  }

  // === USER ===
  
  startEditing(): void {
    this.formUser = { ...this.user };
    this.editing = true;
  }

  startPasswordChanging() : void {
    this.router.navigate(['/passwordchange']);
  }

  saveChanges(): void {
    if(!this.formUser || !this.formUser.id) {
      console.error('Nessun dato utente da salvare.');
      return;
    }

    const updatedUser = { ...this.formUser };

    this.profileService.updateUser(updatedUser).subscribe({
      next: (response) => {
        console.log('Utente aggiornato con successo:', response);
        this.user = { ...updatedUser };
        this.authService.saveUserToStorage(this.user);
        Swal.fire({
          icon: 'success',
          title: 'Profilo aggiornato con successo',
          iconColor: '#6bb95d',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
        });
        this.editing = false;
      }, 
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Si è verificato un errore durante l\'aggiornamento del profilo. Riprova più tardi.',
          iconColor: '#AF3E4D',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
        });
        console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      }
    });
  }

  cancelEditing(): void {
    this.editing = false;
  }

  // === TICKETS ===

  loadUserTickets(): void {
    if(!this.user || !this.user.id) {
      console.error('Nessun utente loggato per caricare i biglietti.');
      return;
    }

    this.profileService.getUserTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei biglietti:', error);
      }
    });
  }

  showTicketDetails(ticket: TicketModel): void {

    this.eventService.getEventById(ticket.eventId.toString()).subscribe({
      next: (event) => {
        Swal.fire({
          title: `<strong>${event.eventName}</strong>`,
          html: `
            <div style="text-align: left;">
              <p><b>Data:</b> ${new Date(event.startDate).toLocaleDateString('it-IT')} - ${new Date(event.endDate).toLocaleDateString('it-IT')}</p>
              <p><b>Orario:</b> ${event.startTime} - ${event.endTime}</p>
              <p><b>Luogo:</b> ${ticket.event_location}</p>
              <p><b>Prenotato il:</b> ${new Date(ticket.purchaseDate).toLocaleDateString()}</p>
            </div>
          `,
          icon: 'info',
          iconColor: '#6bb95d',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Mappa',
          cancelButtonText: 'Elimina ticket',
          confirmButtonColor: '#6bb95d',
          cancelButtonColor: '#AF3E4D',
          focusConfirm: false,
          customClass: {
            confirmButton: 'rounded-btn',
            cancelButton: 'rounded-btn'
          }
        }).then(result => {
          if (result.isConfirmed) {
            if (event.address) {
              const url = `https://www.google.com/maps/search/?q=${event.toponimo}+${event.address},+${event.comune}`;
              window.open(url, '_blank');
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Sei sicuro?',
              text: 'Questa operazione eliminerà definitivamente il ticket.',
              icon: 'warning',
              iconColor: '#6bb95d',
              showCancelButton: true,
              confirmButtonText: 'Sì, elimina',
              cancelButtonText: 'Annulla',
              confirmButtonColor: '#6bb95d',
              cancelButtonColor: '#AF3E4D',
              customClass: {
                confirmButton: 'rounded-btn',
                cancelButton: 'rounded-btn'
              }
            }).then(confirmResult => {
              if (confirmResult.isConfirmed) {
                this.profileService.deleteTicket(ticket.id).subscribe({
                  next: () => {
                    Swal.fire({
                      icon: 'success',
                      iconColor: '#6bb95d',
                      title: 'Eliminato!',
                      text: 'Il ticket è stato eliminato.',
                      confirmButtonColor: '#293B62',
                      customClass: { confirmButton: 'rounded-btn' }
                    });
                    this.tickets = this.tickets.filter(t => t.id !== ticket.id);  
                    
                    // ricarica i ticket
                    this.loadUserTickets();
                  },
                  error: (error) => {
                    console.error('Errore eliminazione ticket', error);
                    Swal.fire({
                      icon: 'error',
                      iconColor: '#AF3E4D',
                      title: 'Errore',
                      text: 'Impossibile eliminare il ticket. Riprova più tardi.',
                      confirmButtonColor: '#293B62',
                      customClass: { confirmButton: 'rounded-btn' }
                    });
                  }
                });
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Errore durante il recupero dei dettagli dell\'evento:', error);
        Swal.fire({
          icon: 'error',
          iconColor: '#AF3E4D',
          title: 'Errore',
          text: 'Impossibile recuperare i dettagli dell\'evento.',
          confirmButtonColor: '#293B62',

        });
      }
    });
  }

  scrollLeft() : void {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() : void {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  onScroll() : void {
    const el = this.carousel.nativeElement;

    this.atStart = el.scrollLeft <= 0;
    this.atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth -1;
  }

  exit(){
    this.router.navigate(['/home']);
  }
}

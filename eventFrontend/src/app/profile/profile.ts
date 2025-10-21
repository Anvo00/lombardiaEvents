import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import Swal from 'sweetalert2';
import { TicketModel } from '../models/ticket.model';

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

  constructor(private authService : AuthService, private profileService : ProfileService) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser != null) {
      try {
        this.user = currentUser;
        this.loadUserTickets();
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
        });
        this.editing = false;
      }, 
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Si è verificato un errore durante l\'aggiornamento del profilo. Riprova più tardi.'
        });
        console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      }
    });
  }

  cancelEditing(): void {
    this.editing = false;
  }

  // TODO Implementare cambio password
  changePassword() {
    throw new Error('Method not implemented.');
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
}

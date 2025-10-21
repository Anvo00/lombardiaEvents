import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import Swal from 'sweetalert2';

interface EventItem {
  title: string;
  description: string;
  date: Date;
  image: string;
}

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

  events: EventItem[] = [
    {
      title: 'Concerto di Musica Classica',
      description: 'Un concerto emozionante con i migliori artisti locali.',
      date: new Date('2025-08-05'),
      image: 'assets/images/classical-concert.jpg'
    },
    {
      title: 'Festival del Cibo di Strada',
      description: 'Assaggia le migliori specialità regionali.',
      date: new Date('2025-08-10'),
      image: 'assets/images/food-festival.jpg'
    },
    {
      title: 'Fiera dell’Artigianato',
      description: 'Esposizione di prodotti artigianali da tutta Italia.',
      date: new Date('2025-08-15'),
      image: 'assets/images/crafts-fair.jpg'
    },
  ];

  constructor(private authService : AuthService, private profileService : ProfileService) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser != null) {
      try {
        this.user = currentUser;
      } catch (error) {
        console.error('Errore nel parsing dell\'utente dal localStorage:', error);
      }
    } else {
      console.warn('Nessun utente trovato nel localStorage.');
    }
  }
  
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
}

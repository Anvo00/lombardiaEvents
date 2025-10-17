import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

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

  constructor(private authService : AuthService) {}
 
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

  // TODO Implementare modifica profilo

  
  startEditing(): void {
    this.formUser = { ...this.user };
    this.editing = true;
  }

  saveChanges(): void {
    this.user = { ...this.formUser };
    this.editing = false;
  }

  cancelEditing(): void {
    this.editing = false;
  }

  // TODO Implementare cambio password
  changePassword() {
    throw new Error('Method not implemented.');
  }
}

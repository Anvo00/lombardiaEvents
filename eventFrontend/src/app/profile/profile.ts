import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface EventItem {
  title: string;
  description: string;
  date: Date;
  image: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  editing = false;

  user: User = {
    firstName: 'Mario',
    lastName: 'Rossi',
    username: 'mrossi',
    email: 'mario.rossi@example.com',
    password: '••••••••'
  };

  formUser: User = { ...this.user };

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
}

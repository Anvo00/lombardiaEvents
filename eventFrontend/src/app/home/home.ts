import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {

  events = [
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
    },{
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
    },{
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
    },{
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
    }
  ];

  constructor() {
    
  }


}

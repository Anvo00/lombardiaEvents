import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  hideFooter = false;

  protected readonly title = signal('eventFrontend');

  constructor(private router : Router){
    this.router.events.subscribe(() => {
      this.hideFooter = this.router.url.includes('/auth');
    })
  }
}

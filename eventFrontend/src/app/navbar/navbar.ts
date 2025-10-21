import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  navbarOpen = false;
  isAuthenticated = false;

  constructor(private authService : AuthService) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(){
    this.authService.logout();
  }
}

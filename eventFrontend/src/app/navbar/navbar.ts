import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  navbarOpen = false;
  isAuthenticated = false;

  constructor(private authService : AuthService, private router : Router) {
    this.authService.isAuthenticated$.subscribe(status => this.isAuthenticated = status);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
    Swal.fire({
        icon: 'info',
        title: 'Logout effettuato',
        text: 'Sei stato discconnesso con successo.',
        iconColor: '#6bb95d',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#293B62',
      });
  }
}

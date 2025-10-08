import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Role } from '@shared/role.enum';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class Auth {

  registerFormActive = false;

  constructor(private authService : AuthService, private router : Router) { }

  onRegisterClick(): void {
    this.registerFormActive = true;
  }

  onLoginClick(): void {
    this.registerFormActive = false;
  }

  //TODO inserire ruolo
  registerUser(name:string, surname:string, username:string, email:string, password:string): void {
    console.log('Registrazione utente...');
    this.authService.register({username, password, name, surname, email, role: Role.USER}).subscribe({
      next: (response) => {
        console.log('Utente registrato con successo:', response);
        this.router.navigate(['/home']); // Reindirizza alla home page dopo la registrazione
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
      }
    });
  }
}

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

  registerUser(name:string, surname:string, username:string, email:string, password:string): void {
    console.log('Registrazione utente...');

    this.authService.register({username, password, name, surname, email, role: Role.USER}).subscribe({
      next: (response) => {
        console.log('Utente registrato e loggato con successo:', response);
        this.authService.getProfile(response.access_token).subscribe({
          next: (user) => {
            console.log('Profilo utente ottenuto con successo:', user);
          }, error: (error) => {
            console.error('Errore durante il recupero del profilo utente:', error);
          }
        });
        this.router.navigate(['/home']); // Reindirizza alla home page dopo la registrazione
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
      }
    });
  }

  /*
  loginUser(username:string, password:string): void {
    console.log('Login utente...');

    this.authService.login({username, password}).subscribe({
      next: (response) => {
        console.log('Utente loggato con successo:', response);
        this.router.navigate(['/home']); // Reindirizza alla home page dopo il login
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
      }
    });
  }
    */

  
  loginUser(username:string, password:string): void {
    console.log('Login utente...'); 

    this.authService.login({username, password}).subscribe({
      next: (response) => {
        console.log('Utente loggato con successo:', response);
        this.authService.getProfile(response.access_token).subscribe({
          next: (user) => {
            console.log('Profilo utente ottenuto con successo:', user);
          }, error: (error) => {
            console.error('Errore durante il recupero del profilo utente:', error);
          }
        });
        this.router.navigate(['/home']); // Reindirizza alla home page dopo il login
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
      }
    });
  }
}

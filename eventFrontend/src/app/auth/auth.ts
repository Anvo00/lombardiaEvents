import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Role } from '@shared/role.enum';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, Footer],
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

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!password) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Devi inserire una password!',
        iconColor: '#AF3E4D',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#293B62',
      });
      return;
    }

    if(password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'La password deve essere lunga almeno 8 caratteri!',
        iconColor: '#AF3E4D',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#293B62',
      });
      return;
    }

    if(!passwordPattern.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'La password deve contenere almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale!',
        iconColor: '#AF3E4D',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#293B62',
      });
      return;
    }

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
        Swal.fire({
          icon: 'success',
          title: 'Registrazione avvenuta con successo!',
          text: 'Benvenut*, ' + username + '!',
          iconColor: '#6bb95d',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
          
        });
        this.router.navigate(['/home']); // Reindirizza alla home page dopo la registrazione
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Errore durante la registrazione',
          text: 'Si è verificato un errore durante la registrazione. Riprova.',
          iconColor: '#AF3E4D',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#293B62',
          
        });
        console.error('Errore durante la registrazione:', error);
      }
    });
  }
  
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
        Swal.fire({
          icon: 'success',
          title: 'Login avvenuto con successo!',
          text: 'Bentornat*, ' + username + '!',
          iconColor: '#6bb95d',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
          
        });
        this.router.navigate(['/home']); // Reindirizza alla home page dopo il login
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Errore durante il login',
          text: 'Credenziali non valide. Riprova.',
          iconColor: '#AF3E4D',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
        });
        console.error('Errore durante il login:', error);
      }
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const token = await this.authService.loginWithGoogle();

      this.authService.getProfile(token).subscribe({
        next: (user) => {
          Swal.fire({
          icon: 'success',
          title: 'Login avvenuto con successo!',
          text: `Bentornat*, ${user.username}!`,
          iconColor: '#6bb95d',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
          });

        this.router.navigate(['/home']);
        },
        error: () => {
          Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Errore nel recupero del profilo utente',
          iconColor: '#AF3E4D',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#293B62',
          });
        }
      });
    }
    catch (error) {
      Swal.fire({
      icon: 'error',
      title: 'Login Google annullato',
      text: 'Operazione interrotta',
      iconColor: '#AF3E4D',
      confirmButtonColor: '#293B62',
    });
    }
  }
}

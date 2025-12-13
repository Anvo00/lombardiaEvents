import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpdateUserDto } from '../auth/dto/user-update.dto';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-change.html',
  styleUrl: './password-change.scss'
})
export class PasswordChange implements OnInit {

  user!: UserModel;
  formUser!: UserModel;

  showPassword: boolean = false;
  showPasswordRepeat: boolean = false;

  constructor(private authService : AuthService, private profileService : ProfileService, private router : Router) {}
 
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser != null) {
      try {
        this.user = currentUser;
        this.formUser = { ...this.user };
      } catch (error) {
        console.error('Errore nel parsing dell\'utente dal sessionStorage:', error);
      }
    } else {
      console.warn('Nessun utente trovato nel sessionStorage.');
    }
  }

  saveChanges(newPassword : string, newPasswordRepeat : string): void {
    if(newPassword !== newPasswordRepeat) {
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Le password non coincidono. Riprova.',
        iconColor: '#799851',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#864B4F',
      });

      return;
    }

    if(!this.formUser || !this.formUser.id) {
      console.error('Nessun dato utente da salvare.');
      return;
    }

    this.profileService.compareUserPassword(this.formUser.id, newPassword).subscribe({
      next: (isValid : boolean) => {
        if(!isValid) {
          Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'La nuova password non può essere uguale alla precedente. Riprova.',
            iconColor: '#799851',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#864B4F',
          });
          return;
        }

      const updatedUser: UpdateUserDto = { password : newPassword};

      this.profileService.updateUserPassword(this.formUser.id, updatedUser).subscribe({
      next: (response) => {
        console.log('Password aggiornata con successo:', response);
        Swal.fire({
          icon: 'success',
          title: 'Password aggiornata con successo',
          iconColor: '#799851',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        }).then((result) => {
          if(result.isConfirmed) {
            this.authService.logout();
            this.router.navigate(['/home']);
          }
        });
      }, 
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Si è verificato un errore durante l\'aggiornamento del profilo. Riprova più tardi.',
          iconColor: '#799851',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#864B4F',
        });
        console.error('Errore durante l\'aggiornamento della password:', error);
      }
    });

    },
      error: (error) => {
        Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Errore durante il confronto delle password. Riprova',
        iconColor: '#799851',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#864B4F',
      });
      }
    });
  }

  cancelEditing(): void {
    this.router.navigate(['/profile'], {queryParams: { editing : true}});
  }
}

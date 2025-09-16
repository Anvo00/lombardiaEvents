import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class Auth {
  registerFormActive = false;

  onRegisterClick(): void {
    this.registerFormActive = true;
  }

  onLoginClick(): void {
    this.registerFormActive = false;
  }
}

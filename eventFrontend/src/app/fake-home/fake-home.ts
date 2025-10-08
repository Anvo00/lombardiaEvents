import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fake-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fake-home.html',
  styleUrl: './fake-home.scss'
})
export class FakeHome {
  
}

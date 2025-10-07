import { Routes } from '@angular/router';

import { Auth } from './auth/auth';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Event } from './event/event';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'profile', component: Profile },
  { path: 'event/:id', component: Event },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: 'home' } // wildcard per le route 
];

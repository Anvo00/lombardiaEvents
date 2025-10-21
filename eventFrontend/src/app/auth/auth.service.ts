import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, tap } from "rxjs";
import { UserModel } from "../models/user.model";
import { CreateUserDto } from "./dto/user-create.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  //private isAuthenticated: boolean = false;

  private baseUrl = `${environment.apiUrl}/auth`; // URL del backend

  constructor(private http: HttpClient) {}

  saveUserToStorage(user: UserModel | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): UserModel | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  register(newUser: CreateUserDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/register`, newUser).pipe(
      tap(res => {
        console.log('Risposta registrazione e login ricevuta:', res);
        localStorage.setItem('token', (res as any).access_token);
      })
    );
  }
  
  login(loginUser: UserLoginDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/login`, loginUser).pipe(
      tap(res => {
        console.log('Risposta login ricevuta:', res);
        localStorage.setItem('token', (res as any).access_token);
      })
    );
  }

  getProfile(access_token : String): Observable<UserModel> {
    return this.http.get<UserModel>(this.baseUrl + `/profile`, {headers: {Authorization: `Bearer ${access_token}`}}).pipe(
      tap(user => {
        this.saveUserToStorage(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}
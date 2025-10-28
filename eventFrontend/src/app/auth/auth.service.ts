import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UserModel } from "../models/user.model";
import { CreateUserDto } from "./dto/user-create.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private baseUrl = `${environment.apiUrl}/auth`; // URL del backend

  constructor(private http: HttpClient) {}

  saveUserToStorage(user: UserModel | null) {
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): UserModel | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  register(newUser: CreateUserDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/register`, newUser).pipe(
      tap(res => {
        console.log('Risposta registrazione e login ricevuta:', res);
        sessionStorage.setItem('token', (res as any).access_token);
        this.isAuthenticated.next(true)
      })
    );
  }
  
  login(loginUser: UserLoginDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/login`, loginUser).pipe(
      tap(res => {
        console.log('Risposta login ricevuta:', res);
        sessionStorage.setItem('token', (res as any).access_token);
        this.isAuthenticated.next(true)
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

  // TODO Richiedere conferma dopo il click
  logout() {
    sessionStorage.clear();
    this.isAuthenticated.next(false);
  }
}
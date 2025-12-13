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
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private baseUrl = `${environment.apiUrl}/auth`; // URL del backend

  constructor(private http: HttpClient) {
    if(typeof window !== 'undefined'){
      const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
          this.currentUserSubject.next(JSON.parse(storedUser));
          this.isAuthenticated.next(true);
        }
    }
  }

  getCurrentUser(): UserModel | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  saveUserToStorage(user: UserModel | null) {
    if (typeof window === 'undefined') return;

    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticated.next(true);
    } else {
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.isAuthenticated.next(false);
    }
  }

  register(newUser: CreateUserDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/register`, newUser).pipe(
      tap(res => {
        console.log('Risposta registrazione e login ricevuta:', res);
        sessionStorage.setItem('token', (res as any).access_token);
        this.getProfile((res as any).access_token).subscribe();
        this.isAuthenticated.next(true)
      })
    );
  }
  
  login(loginUser: UserLoginDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/login`, loginUser).pipe(
      tap(res => {
        console.log('Risposta login ricevuta:', res);
        sessionStorage.setItem('token', (res as any).access_token);
        this.getProfile((res as any).access_token).subscribe();
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

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
  }
}
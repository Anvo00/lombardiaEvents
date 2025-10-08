import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { CreateUserDto } from "./dto/user-create.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  //private isAuthenticated: boolean = false;

  private baseUrl = `${environment.apiUrl}/auth`; // URL del backend

  constructor(private http: HttpClient) {}

  register(newUser: CreateUserDto) : Observable<any> {
    return this.http.post(this.baseUrl + `/register`, newUser);
  }
}
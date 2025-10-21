import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

    private baseUrl = `${environment.apiUrl}/users`; // URL del backend

    constructor(private http : HttpClient){}

    // === USER ===

    updateUser(user : UserModel) : Observable<any> {
        return this.http.patch(this.baseUrl + `/${user.id}`, user, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }

    // === TICKETS ===

    getUserTickets(): Observable<any> {
      return this.http.get(this.baseUrl + `/tickets`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }
}
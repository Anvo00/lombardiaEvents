import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UpdateUserDto } from "../auth/dto/user-update.dto";
import { TicketModel } from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

    private readonly baseUrl = `${environment.apiUrl}/users`; // URL del backend
    private readonly ticketsUrl = `${environment.apiUrl}/tickets`;

    constructor(private http : HttpClient){}

    // === USER ===

    updateUser(user : UserModel) : Observable<any> {
      return this.http.patch(this.baseUrl + `/${user.id}`, user, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }

    updateUserPassword(id : number, user : UpdateUserDto) : Observable<any>{
      return this.http.patch(this.baseUrl + `/${id}`, user, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }

    compareUserPassword(id: number, password: string): Observable<any> {
      return this.http.post(this.baseUrl + `/compare-password/${id}`, { password }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }

    // === TICKETS ===

    getUserTickets(): Observable<TicketModel[]> {
      return this.http.get<TicketModel[]>(this.baseUrl + `/tickets`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }

    deleteTicket(id: number): Observable<any> {
      return this.http.delete(this.ticketsUrl + `/${id}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
    }
}
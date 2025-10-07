import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventModel } from "../models/event.model";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private baseUrl = `${environment.apiUrl}/events`; // URL del backend

    constructor(private http: HttpClient) {}

    // Metodo per ottenere tutti gli eventi
    getEvents() : Observable<EventModel[]>{
        return this.http.get<EventModel[]>(this.baseUrl);
    }

    getEventById(id: string) : Observable<EventModel> {
      console.log('Chiamata getEventById con id:', id);
      console.log('URL chiamata:', this.baseUrl + `/${id}`);
      return this.http.get<EventModel>(this.baseUrl + `/${id}`);
    }
}
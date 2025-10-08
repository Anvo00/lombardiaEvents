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

    getEventsByName(name: string) : Observable<EventModel[]> {
      return this.http.get<EventModel[]>(this.baseUrl + `/search/${name}`);
    }

    getEventById(id: string) : Observable<EventModel> {
      return this.http.get<EventModel>(this.baseUrl + `/${id}`);
    }
}
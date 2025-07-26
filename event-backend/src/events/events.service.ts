import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EventDto } from './dto/event.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EventsService {

    constructor(private readonly httpService: HttpService) {}

    // Endpoint API
    private url = "https://www.dati.lombardia.it/resource/hs8z-dcey.json";

    async findAllEvents() : Promise<EventDto[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventDto[]>(this.url));
            return plainToInstance(EventDto, response.data, { excludeExtraneousValues: true });
        } catch (error) {
            throw error;
        }
    }

    async findEventsByName(name: string) : Promise<EventDto[]>{
        const events = await this.findAllEvents();
        const search = name.replace(/\s/g, '').toLowerCase();

        const filteredEvents = events.filter((e: EventDto) => e.eventName?.replace(/\s/g, '').toLowerCase().startsWith(search));
    
        return filteredEvents;
    }
}

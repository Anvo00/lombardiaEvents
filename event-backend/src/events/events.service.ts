import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EventDto } from './dto/event.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EventsService {

    constructor(private readonly httpService: HttpService) {}

    // Endpoint API
    private limit = 5000;
    private url = `https://www.dati.lombardia.it/resource/hs8z-dcey.json?$limit=${this.limit}`;

    async findAllEvents() : Promise<EventDto[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventDto[]>(this.url));

            return plainToInstance(EventDto, response.data, { excludeExtraneousValues: true }); // Trasforma i dati JSON in istanze di EventDto
        } catch (error) {
            throw error;
        }
    }

    async findEventsByName(name: string) : Promise<EventDto[]>{
        const events = await this.findAllEvents();
        const search = name.replace(/\s/g, '').toLowerCase();

        const filteredEvents = events.filter((e: EventDto) => e.eventName?.replace(/\s/g, '').toLowerCase().startsWith(search));

        if (filteredEvents.length === 0) {
            throw new NotFoundException('Nessun evento trovato');
        }

        return filteredEvents;
    }

    async findEventById(id: number) : Promise<EventDto> {
        const events = await this.findAllEvents();
        const event = events.find((e: EventDto) => e.id === id);

        if (!event) throw new NotFoundException(`Evento con id ${id} non trovato`);

        return event;
    }
}

import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {

    constructor(private readonly eventsService: EventsService) {}

    // Ritorna tutti gli eventi presenti
    @Get()
    async getEvents() : Promise<EventDto[]>{
        return this.eventsService.findAllEvents();
    }

    // Ritorna tutti gli eventi con un filtro sul campo "Nome"
    @Get(':name')
    async getEventsByName(@Param('name') name: string) : Promise<EventDto[]>{
        return this.eventsService.findEventsByName(name);
    }
}

import { Controller, Get, Param} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';

@Controller('events')
export class EventsController {

    constructor(private readonly eventsService: EventsService) {}

    // Ritorna tutti gli eventi presenti
    @Get()
    async getEvents() : Promise<EventDto[]>{
        const events = await this.eventsService.findAllEvents();
        return events.sort((a,b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    // Ritorna tutti gli eventi con un filtro sul campo "Nome"
    @Get('search/:name')
    async getEventsByName(@Param('name', SafeStringPipe) name: string) : Promise<EventDto[]>{
        return this.eventsService.findEventsByName(name);
    }

    @Get(':id')
    async getEventById(@Param('id', SafeStringPipe) id: number) : Promise<EventDto> {
        return this.eventsService.findEventById(id);
    }
}

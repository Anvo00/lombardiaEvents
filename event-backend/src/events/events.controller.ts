import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/common/role.enum';

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
    async getEventsByName(@Param('name', SafeStringPipe) name: string) : Promise<EventDto[]>{
        return this.eventsService.findEventsByName(name);
    }

    @Get(':id')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Roles(Role.ADMIN)
    async getEventById(@Param('id', SafeStringPipe) id: string) : Promise<EventDto> {
        return this.eventsService.findEventById(id);
    }
}

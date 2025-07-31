import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/typeorm/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class TicketsService {

    constructor(@InjectRepository(Ticket) private ticketsRepository : Repository<Ticket>,
        private eventsService : EventsService){}

    async findAllTickets() : Promise<Ticket[]> {
        const tickets = await this.ticketsRepository.find();
        
        if(tickets.length === 0) throw new NotFoundException('Nessun biglietto trovato nel database');

        return tickets;
    }

    async findTicketById(id: number) : Promise<Ticket | null> {
        if(id <= 0) throw new BadRequestException('ID non valido');

        const ticket = await this.ticketsRepository.findOne({where: {id}});

        if(!ticket) throw new NotFoundException(`Biglietto con id ${id} non trovato`);

        return ticket;
    }

    async findTicketsByUserId(userId: number) : Promise<Ticket[]> {
        const tickets = await this.ticketsRepository.find({where: {userId}, order: {purchaseDate: 'DESC'}})

        if(tickets.length === 0) throw new NotFoundException(`Nessun biglietto trovato per l'utente con id ${userId}`);

        return tickets;
    }



    //--- CRUD Operations ---//


    async createTicket(userId : number, createTicketDto : CreateTicketDto) : Promise<Ticket> {
        const event = await this.eventsService.findEventById(createTicketDto.eventId.toString());

        if (!event) throw new NotFoundException(`Evento con id ${createTicketDto.eventId} non trovato`);

        const newTicket = this.ticketsRepository.create({
            ...createTicketDto,
            userId,
            event_name: event.eventName,
            event_date: event.startDate + ' ' + event.endDate,
            event_location: event.toponimo + ' ' + event.address,
            purchaseDate: new Date().toISOString(),
        });

        return this.ticketsRepository.save(newTicket);
    }

    async updateTicket(id: number, updateTicketDto: any) : Promise<Ticket> {
        const updatedTicket = await this.ticketsRepository.preload({id, ...updateTicketDto});

        if(!updatedTicket) throw new NotFoundException(`Biglietto con id ${id} non trovato`);

        return this.ticketsRepository.save(updatedTicket);
    }

    async deleteTicket(id : number){
        const deletedTicket = await this.findTicketById(id);

        if(!deletedTicket) throw new NotFoundException(`Biglietto con id ${id} non trovato`);

        return this.ticketsRepository.remove(deletedTicket);
    }

}

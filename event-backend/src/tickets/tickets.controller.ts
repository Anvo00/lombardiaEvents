import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {

    constructor(private ticketsService: TicketsService) {}

    @Get()
    getTickets() {
        return this.ticketsService.findAllTickets();
    }

    @Get(':id')
    getTicketById(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.findTicketById(id);
    }



    //--- CRUD Operations ---//
    

    @UseGuards(JwtAuthGuard)
    @Post('purchase')
    purchaseTicket(@Req() req, @Body() createTicketDto : CreateTicketDto) {
        const userId = req.user.sub;
        return this.ticketsService.createTicket(userId, createTicketDto);
    }

    @Patch(':id')
    updateTicket(@Param('id', ParseIntPipe) id: number, @Body() updateTicketDto : UpdateTicketDto) {
        return this.ticketsService.updateTicket(id, updateTicketDto);
    }

    @Delete(':id')
    deleteTicket(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.deleteTicket(id);
    }
}

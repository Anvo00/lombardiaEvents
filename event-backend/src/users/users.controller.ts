import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';
import { TicketsService } from 'src/tickets/tickets.service';
import { Ticket } from 'src/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {

    constructor (private userService : UsersService,
        private ticketsService : TicketsService
    ) {}

    @Get()
    getUsers(){
        return this.userService.findAllUsers();
    }
    
    @Get('tickets')
    @UseGuards(JwtAuthGuard)
    getTicketsByUserId(@Req() req) : Promise<Ticket[]>{
        console.log('Richiesta ricevuta per ottenere i biglietti dell\'utente');
        // Controlla che l'utente esista
        const userId = req.user.sub;
        console.log(`User ID from request: ${userId}`);
        console.log(`Cerco l'utente nel dabatabe`);
        this.userService.findUserById(userId);

        console.log(`Cerco i ticket per l'utente con ID: ${userId}`);
        return this.ticketsService.findTicketsByUserId(userId);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number){
        return this.userService.findUserById(userId);
    }

    @Get(':username')
    getUserByUsername(@Param('username', SafeStringPipe) username : string) {
        return this.userService.findUserByUsername(username);
    }



    //--- CRUD Operations ---//
    

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }


    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id : number){
        return this.userService.deleteUser(id);
    }


    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }
}

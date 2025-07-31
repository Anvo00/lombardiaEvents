import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';
import { TicketsService } from 'src/tickets/tickets.service';
import { Ticket } from 'src/typeorm';

@Controller('users')
export class UsersController {

    constructor (private userService : UsersService,
        private ticketsService : TicketsService
    ) {}

    @Get()
    getUsers(){
        return this.userService.findAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number){
        return this.userService.findUserById(userId);
    }

    @Get(':username')
    getUserByUsername(@Param('username', SafeStringPipe) username : string) {
        return this.userService.findUserByUsername(username);
    }

    @Get(':id/tickets')
    getTicketsByUserId(@Param('id', ParseIntPipe) userId: number) : Promise<Ticket[]>{
        // Controlla che l'utente esista
        this.getUserById(userId);

        return this.ticketsService.findTicketsByUserId(userId);
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

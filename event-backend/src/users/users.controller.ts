import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';
import { TicketsService } from 'src/tickets/tickets.service';
import { Ticket, User } from 'src/database/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@shared/role.enum';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('users')
export class UsersController {

    constructor (private userService : UsersService,
        private ticketsService : TicketsService
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    getUsers(){
        return this.userService.findAllUsers();
    }
    
    @Get('tickets')
    @UseGuards(JwtAuthGuard)
    getTicketsByUserId(@Req() req) : Promise<Ticket[]>{
        // Controlla che l'utente esista
        const userId = req.user.sub;
        this.userService.findUserById(userId);
        
        return this.ticketsService.findTicketsByUserId(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    getUserById(@Param('id', ParseIntPipe) userId: number){
        return this.userService.findUserById(userId);
    }

    @Get('username/:username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    getUserByUsername(@Param('username', SafeStringPipe) username : string) {
        return this.userService.findUserByUsername(username);
    }



    //--- CRUD Operations ---//
    

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    deleteUser(@Param('id', ParseIntPipe) id : number){
        return this.userService.deleteUser(id);
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto, @Req() req) : Promise<User>{
        const user = req.user;
        if(user.sub !== id) {
            throw new ForbiddenException('Non hai i permessi per aggiornare questo utente');
        }
        
        return this.userService.updateUser(id, updateUserDto);
    }

    @Post('compare-password/:id')
    @UseGuards(JwtAuthGuard)
    compareUserPassword(@Param('id', ParseIntPipe) id: number, @Body('password') password: string, @Req() req) : Promise<boolean> {
        const user = req.user;
        if(user.sub !== id) {
            throw new ForbiddenException('Non hai i permessi per confrontare la password di questo utente');
        }

        return this.userService.comparePasswords(id, password);
    }
}

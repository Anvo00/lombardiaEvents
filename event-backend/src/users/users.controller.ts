import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor (private readonly userService : UsersService) {}

    @Get()
    getUsers(){
        return this.userService.findAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.findUserById(id);
    }


    //--- CRUD Operations ---//
    

    // user (dto con dati)
    @Post()
    //TODO Inserire nei parametri di @Body() "ValidationPipe"
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.create(createUserDto);
    }


    // id
    @Delete(':id')
    //TODO (Forse viene fatto dal DB) Modificare gli id successivi
    deleteUser(@Param('id', ParseIntPipe) id : number){
        return this.userService.delete(id);
    }


    // id + updatedUser (dto con campi opzionali)
    @Patch(':id')
    //TODO Inserire nei parametri di @Body() "ValidationPipe"
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto){
        return this.userService.update(id, updateUserDto);
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeStringPipe } from 'src/common/safe-string.pipe';

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

    @Get(':username')
    getUserByUsername(@Param('username', SafeStringPipe) username : string) {
        return this.userService.findUserByUsername(username);
    }


    //--- CRUD Operations ---//
    

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.create(createUserDto);
    }


    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id : number){
        return this.userService.delete(id);
    }


    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto){
        return this.userService.update(id, updateUserDto);
    }
}

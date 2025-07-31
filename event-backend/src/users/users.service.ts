import { BadGatewayException, BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../typeorm/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

    
    async findAllUsers() : Promise<User[]>{
        const users = await this.userRepository.find();

        if(users.length === 0) throw new NotFoundException('Nessun utente trovato nel database');

        return users;
    }

    async findUserByUsername(username : string) : Promise<User | null> {
        const user = await this.userRepository.findOne({where : {username}});

        if(!user) throw new NotFoundException(`Utente con username ${username} non trovato`);

        return user;
    }

    async findUserById(id : number) : Promise<User | null> {
        if(id <= 0) throw new BadRequestException('ID non valido');

        const user = await this.userRepository.findOne({where: {id}})

        if(!user) throw new NotFoundException(`Utente con id ${id} non trovato`);

        return user;
    }


    //--- CRUD Operations ---//


    async createUser(createUserDto : CreateUserDto) : Promise<User>{
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async updateUser(id : number, updateUserDto : UpdateUserDto) : Promise<User> {
        // Se viene trovato l'utente, allora viene fatto il merge delle informazioni automaticamente
        const updatedUser = await this.userRepository.preload({id, ...updateUserDto});

        if(!updatedUser) throw new NotFoundException(`Utente con id ${id} non trovato`);

        return this.userRepository.save(updatedUser);
    }

    async deleteUser(id: number) {
        const removedUser = await this.findUserById(id);

        if (!removedUser) throw new NotFoundException(`Utente con id ${id} non trovato`);

        return this.userRepository.remove(removedUser);
    }

}

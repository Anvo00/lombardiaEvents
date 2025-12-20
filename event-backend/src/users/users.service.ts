import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from '../database/typeorm/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserGoogleDto } from 'src/auth/dto/create-user-google.dto';import { create } from 'domain';
import { FavoriteEvent } from 'src/database/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(FavoriteEvent) private favoritesRepository : Repository<FavoriteEvent>) {}

    
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

        console.log(`Utente trovato: ${user.username}`);
        return user;
    }


    // === CRUD Operations === //


    async createUser(createUserDto : CreateUserDto) : Promise<User>{
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async createGoogleUser(createUserGoogleDto: CreateUserGoogleDto) : Promise<User> {
        const existingGoogleIdUser = await this.userRepository.findOne({where: {googleId: createUserGoogleDto.googleId}});
        if(existingGoogleIdUser) throw new BadRequestException('Utente con Google ID già esistente');

        // Se l'utente si è già registrato con la stessa mail, lo collega all'account Google
        const existingEmailUser = await this.userRepository.findOne({where: {email: createUserGoogleDto.email}});
        if(existingEmailUser) {
            existingEmailUser.googleId = createUserGoogleDto.googleId;
            existingEmailUser.provider = 'google';
            return this.userRepository.save(existingEmailUser);
        }

        // Se l'utente non ha uno username, ne genera uno automaticamente
        if(!createUserGoogleDto.username) {
            createUserGoogleDto.username = createUserGoogleDto.name.toLowerCase() + '.' + createUserGoogleDto.surname.toLowerCase();

            let counter = 1;
            let tempUsername = createUserGoogleDto.username;
            while(await this.userRepository.findOne({where: {username: tempUsername}})) {
                tempUsername = `${createUserGoogleDto.username}${counter}`;
                counter++;
            }
            createUserGoogleDto.username = tempUsername;
        }

        const newGoogleUser = this.userRepository.create({
            ...createUserGoogleDto,
            provider: 'google',
            password: createUserGoogleDto.password ? await this.hashPassword(createUserGoogleDto.password) : await this.hashPassword(Math.random().toString(36).slice(-8).toUpperCase() + '1'),
        });

        return this.userRepository.save(newGoogleUser);
    }

    async updateUser(id : number, updateUserDto : UpdateUserDto) : Promise<User> {
        // Se viene trovato l'utente, allora viene fatto il merge delle informazioni automaticamente
        const updatedUser = await this.userRepository.preload({id, ...updateUserDto});

        if(!updatedUser) throw new NotFoundException(`Utente con id ${id} non trovato`);

        // Se vi è la password, allora l'utente sta cercando di modificare la propria password
        if (updateUserDto.password) {
            updatedUser.password = await this.hashPassword(updateUserDto.password);
        }

        return this.userRepository.save(updatedUser);
    }

    async deleteUser(id: number) {
        const removedUser = await this.findUserById(id);

        if (!removedUser) throw new NotFoundException(`Utente con id ${id} non trovato`);

        return this.userRepository.remove(removedUser);
    }

    async hashPassword(password: string): Promise<string> {
            const saltRounds = 10;
            return bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(id: number, newPassword: string): Promise<boolean> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new NotFoundException(`Utente con id ${id} non trovato`);
        }

        const isSame = await bcrypt.compare(newPassword, user.password);
        if(isSame) {
            return false;
        }

        return true;
    }

    async findUserByGoogleId(googleId : string) : Promise<User | null> {
        return this.userRepository.findOne({where : {googleId}});
    }


    // === FAVORITE EVENTS === //

    async getFavoriteEvents(userId: number) : Promise<FavoriteEvent[]> {
        const user = await this.findUserById(userId);
        if(!user) throw new NotFoundException(`Utente con id ${userId} non trovato`);

        return this.favoritesRepository.find({where: {user: {id: userId}}});
    }

    async addFavoriteEvent(userId: number, eventId: number) : Promise<FavoriteEvent> {
        const user = await this.findUserById(userId);
        if(!user) throw new NotFoundException(`Utente con id ${userId} non trovato`);

        const favorite = this.favoritesRepository.create({ eventId, user });
            return this.favoritesRepository.save(favorite);
    }

    async removeFavoriteEvent(userId: number, eventId: number) {
        const user = await this.findUserById(userId);
        if(!user) throw new NotFoundException(`Utente con id ${userId} non trovato`);
            
        return this.favoritesRepository.delete({ user: {id: userId}, eventId});
    }
}

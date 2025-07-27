import { BadGatewayException, BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './typeorm/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

    
    findAllUsers() : Promise<User[]>{
        return this.userRepository.find();
    }

    // Se l'utente non esiste, ritorna un elemento null (secondo il metodo della repository)
    findUserById(id : number) : Promise<User | null> {
        if(id <= 0) {
            throw new BadRequestException('ID non valido');
        }

        return this.userRepository.findOne({where: {id}});
    }


    //--- CRUD Operations ---//


    create(createUserDto : CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async update(id : number, updateUserDto : UpdateUserDto){
        // Se viene trovato l'utente, allora viene fatto il merge delle informazioni automaticamente
        const updatedUser = await this.userRepository.preload({id, updateUserDto});

        console.log('Risultato preload:', updatedUser);

        if(!updatedUser) {
            throw new NotFoundException(`Utente con id ${id} non trovato`);
        }

        return this.userRepository.save(updatedUser);
    }

    async delete(id: number) {
        const removedUser = await this.findUserById(id);

        if (!removedUser) {
        throw new BadRequestException(`Utente con id ${id} non trovato`);
        }

        return this.userRepository.remove(removedUser);
    }

}

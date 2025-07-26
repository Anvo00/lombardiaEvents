import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    // Visto che non c'è un collegamento al DB, creo una lista di prova qui
    private users = [
        {
            "id": 1,
            "nome": "Davide",
            "cognome": "Russo",
            "email": "davide.russo@gmail.com"
        },
        {
            "id": 2,
            "nome": "Luca",
            "cognome": "Martini",
            "email": "luca.martini@gmail.com"
        },
        {
            "id": 3,
            "nome": "Mario",
            "cognome": "Bianchi",
            "email": "mario.bianchi@gmail.com"
        }
    ]

    findAllUsers(){
        return this.users;
    }

    findUserById(id : number){
        //TODO Validare input
        const user = this.users.find(user => user.id === id);
        return user;
    }


    //--- CRUD Operations ---//


    //TODO Implementare con collegamento al DB
    create(createUserDto : CreateUserDto) {
        // Genera un ID senza DB
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser);
        return newUser;
    }

    //TODO Implementare con collegamento al DB
    update(id : number, updateUserDto : UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })

        return this.findUserById(id);
    }

    //TODO Implementare con collegamento al DB
    delete(id: number) {
        const removedUser = this.findUserById(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }

}

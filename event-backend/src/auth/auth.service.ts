import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/typeorm';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}
    
    async register(userData: CreateUserDto) : Promise<User> {
        const hashedPassword = await this.hashPassword(userData.password);
        const newUser = { ...userData, password: hashedPassword };
        
        // DEBUG: Controllo cosa c'è in newUser
        console.log('newUser Data:', newUser);

        return this.userService.create(newUser);
    }

    async validateUser(userLoginDto: UserLoginDto) : Promise<any> {
        try {
            const user = await this.userService.findUserByUsername(userLoginDto.username);
            
            if(user && await bcrypt.compare(userLoginDto.password, user.password)) {
                // Rimuovo la password dall'oggetto utente prima di restituirlo
                const { password, ...result } = user;


                // DEBUG: Controllo cosa c'è in result
                console.log('Validated User Data:', result);

                return result;
            }
            
            return null;
        } catch (error) {
            // Se non esiste, 'findUserByUsername' lancia un'eccezione
            return null;
        }
    }
    
    //TODO Provare test per la registrazione (controlla utente com'è fatto)
    async login(user: any) : Promise<any> {

        // DEBUG: Controllo cosa c'è in user
        console.log('User Data in Login:', user);

        return {
            access_token: this.jwtService.sign(user),
            user,
        }
    }


    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

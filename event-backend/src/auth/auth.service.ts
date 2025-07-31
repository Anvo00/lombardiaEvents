import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}
    
    async register(userData: CreateUserDto) : Promise<User> {
        const hashedPassword = await this.hashPassword(userData.password);
        const newUser = { ...userData, password: hashedPassword };
    
        return this.userService.createUser(newUser);
    }

    async validateUser(userLoginDto: UserLoginDto) : Promise<any> {
        try {
            const user = await this.userService.findUserByUsername(userLoginDto.username);
            
            if(user && await bcrypt.compare(userLoginDto.password, user.password)) {
                // Rimuovo la password dall'oggetto utente prima di restituirlo
                const { password, ...result } = user;
                return result;
            }
            
            return null;
        } catch (error) {
            // Se non esiste, 'findUserByUsername' lancia un'eccezione
            return null;
        }
    }
    
    async login(user: any) : Promise<any> {

        return {access_token: this.jwtService.sign(user)}
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

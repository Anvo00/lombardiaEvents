import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { Role } from '@shared/role.enum';
import { CreateUserGoogleDto } from './dto/create-user-google.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}
    
    async register(userData: CreateUserDto) : Promise<User> {
        const hashedPassword = await this.hashPassword(userData.password);
        const newUser = { ...userData, password: hashedPassword };
    
        return this.userService.createUser(newUser);
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<any> {
        try {
            const user = await this.userService.findUserByUsername(userLoginDto.username);
            if (user && await bcrypt.compare(userLoginDto.password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            console.error('Errore durante validateUser:', error);
            return null;
        }
    }
    
    async login(user: User) : Promise<{access_token: string}> {

        const payload = {
            username: user.username,
            sub: user.id,
            role: user.role,
            provider: user.provider
        }
        
        return {access_token: this.jwtService.sign(payload)}
    }

    async validateOrCreateUser(googleUser: {email: string; name: string; surname: string; googleId: string;}): Promise<User> {
        const existingGoogleIdUser = await this.userService.findUserByGoogleId(googleUser.googleId);
        if (existingGoogleIdUser) return existingGoogleIdUser;

        const createUserGoogleDto: CreateUserGoogleDto = {
            email: googleUser.email,
            name: googleUser.name,
            surname: googleUser.surname,
            role: Role.USER,
            googleId: googleUser.googleId
        };

        return this.userService.createGoogleUser(createUserGoogleDto);
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

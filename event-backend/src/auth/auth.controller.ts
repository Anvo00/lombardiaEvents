import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)  // Per attivare @Exlude nell'entità
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    // I dati del body vengono presi tramite passport 
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.register(createUserDto);
        if (!user) return { message: 'Registrazione fallita' };

        /*
        // Una volta registrato, l'utente può essere autenticato
        const loginResult = await this.authService.login(user);
        */

        return {message: 'Utente registrato con successo'};
    }


    // Metodo per ottenere il profilo dell'utente autenticato
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        return req.user;
    }
}

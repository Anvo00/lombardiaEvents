import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)  // Per attivare @Exlude nell'entità
export class AuthController {

    constructor(private authService: AuthService,
        private usersService: UsersService
    ) {}

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

        // Una volta registrato, l'utente può essere autenticato
        const loginResult = await this.authService.login(user);

        return {message: 'Utente registrato e loggato con successo', ...loginResult};
    }


    // Metodo per ottenere il profilo dell'utente autenticato
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        const userId = req.user.sub;
        return await this.usersService.findUserById(userId);
    }
}

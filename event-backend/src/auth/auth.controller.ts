import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';


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

    
    // === GOOGLE ===

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(){
        // Reindirizza a google per l'autenticazione
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res({ passthrough: true}) res: Response){
        if(!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/google-callback?error=1`)
        }

        const {access_token} = await this.authService.login(req.user);
        res.redirect(
            `${process.env.FRONTEND_URL}/google-callback?token=${access_token}`
        );
    }

    // Metodo per ottenere il profilo dell'utente autenticato
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        const userId = req.user.sub;
        return await this.usersService.findUserById(userId);
    }
}

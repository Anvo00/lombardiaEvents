import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    
    @IsNotEmpty()
    @Length(3, 20)
    name: string;
    
    @IsNotEmpty()
    @Length(3, 30)
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
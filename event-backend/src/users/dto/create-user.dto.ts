import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Role } from "../../common/role.enum";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @Length(8, 15)
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
         'La password deve contenere almeno una lettera maiuscola e un numero',
    })
    password: string;
    
    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @Length(3, 30)
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
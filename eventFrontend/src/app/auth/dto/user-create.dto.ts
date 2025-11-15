import { Role } from '@shared/role.enum';

export interface CreateUserDto{
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
}
import { Role } from '@shared/role.enum';

export interface UserModel {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    role: Role;
}
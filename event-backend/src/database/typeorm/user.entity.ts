import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../common/role.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id',
    })
    id : number;

    @Column({
        name: 'username',
        nullable: false,
        default: ' ',
    })
    username: string;

    @Column({
        name: 'password',
        nullable: false,
        default: ' ',
    })
    @Exclude()
    password: string;

    @Column({
        name: 'user_name',
        nullable: false,
        default: ' ',
    })
    name: string;

    @Column({
        name: 'user_surname',
        nullable: false,
        default: ' ',
    })
    surname: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ' ',
    })
    email: string;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;
}
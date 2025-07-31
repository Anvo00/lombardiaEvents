import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ticket } from "./ticket.entity";

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
}
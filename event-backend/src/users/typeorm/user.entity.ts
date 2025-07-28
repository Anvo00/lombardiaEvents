import { Entity, Column,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id',
    })
    id : number;

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
import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Role } from '@shared/role.enum';
import { FavoriteEvent } from "./favorite-event.entity";

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

    @Column({type: 'simple-enum', enum: Role, default: Role.USER})
    role: Role;

    @Column({
        name: 'google_id',
        nullable: true,
    })
    googleId?: string;

    @Column({
        name: 'provider',
        nullable: false,
        default: 'local',
    })
    provider: string;

    @ManyToMany(() => FavoriteEvent, fav => fav.user)
    favoriteEvents: FavoriteEvent[];
}
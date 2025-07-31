import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Ticket{


    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    userId: number;

    @Column({})
    event_name: string;

    @Column({})
    event_date: string;

    @Column({})
    event_location: string;

    @Column({})
    price: number;

    @Column({})
    purchaseDate: string;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket{


    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    userId: number;

    @Column({})
    eventId: number;

    @Column({})
    event_name: string;

    @Column({})
    event_date: string;

    @Column({})
    event_location: string;

    @Column({
        default: 0.0,
    })
    price: number;

    @Column({})
    purchaseDate: string;
}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class FavoriteEvent {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'user_id',
    })
    id : number;

    @Column()
    eventId: number;

    @ManyToOne(() => User, user => user.favoriteEvents, { onDelete: 'CASCADE' })
    user: User;
}
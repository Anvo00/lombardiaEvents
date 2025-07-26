import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

//TODO Terminare di validare i dati

export class EventDto {
    @Expose({name: 'id'})
    @IsNumber()
    id: number;

    @Expose({name: 'denom'})
    @IsString()
    eventName: string;

    @Expose({name: 'tipo'})
    @IsString()
    type: string;

    @Expose({name: 'data_in'})
    @IsDate()
    startDate: Date;

    @Expose({name: 'ora_in'})
    @IsString()
    startTime: string;

    @Expose({name: 'data_fine'})
    @IsDate()
    endDate: Date;

    @Expose({name: 'ora_fine'})
    @IsString()
    endTime: string;

    @Expose({name: 'anno'})
    @IsNumber()
    year: number;

    @Expose({name: 'prov'})
    @IsString()
    provincia: string;

    @Expose({name: 'comune'})
    @IsString()
    comune: string;

    @Expose({name: 'toponimo'})
    @IsString()
    toponimo: string;

    @Expose({name: 'indirizzo'})
    @IsString()
    address: string;

    @Expose({name: 'cap'})
    @IsNumber()
    cap: number;


    //TODO Mancano le coordinate
}
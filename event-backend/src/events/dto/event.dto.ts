import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

//TODO Terminare di validare i dati

export class EventDto {
    @Expose({name: 'id'})
    @IsString()
    id: string;

    @Expose({name: 'denom'})
    @IsString()
    eventName: string;

    @Expose({name: 'tipo'})
    @IsString()
    type: string;

    @Expose({name: 'data_in'})
    @IsString()
    startDate: string;

    @Expose({name: 'ora_in'})
    @IsString()
    startTime: string;

    @Expose({name: 'data_fine'})
    @IsString()
    endDate: string;

    @Expose({name: 'ora_fine'})
    @IsString()
    endTime: string;

    @Expose({name: 'anno'})
    @IsString()
    year: string;

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
    @IsString()
    cap: string;


    //TODO Mancano le coordinate
}
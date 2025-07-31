import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
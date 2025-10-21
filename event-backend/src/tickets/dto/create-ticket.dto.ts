import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsString()
    eventId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
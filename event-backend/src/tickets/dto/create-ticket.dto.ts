import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsString()
    eventId: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
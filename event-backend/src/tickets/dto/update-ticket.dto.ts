import { PartialType } from "@nestjs/mapped-types";
import { CreateTicketDto } from "./create-ticket.dto";

export class UpdateTicketDto {

    event_name?: string;

    event_date?: string;

    event_location?: string;

    price?: number;
}
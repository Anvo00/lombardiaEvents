export interface TicketModel {
    id: number;
    userId: number;
    eventId: number;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    price: number;
    purchaseDate: string;
}
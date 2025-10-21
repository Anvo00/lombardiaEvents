export interface EventModel {
    id: string;
    eventName: string;
    type: string;
    description?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    year: string;
    provincia: string;
    comune: string;
    toponimo: string;
    address: string;
    cap: string;
}
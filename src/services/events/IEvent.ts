import { ICity } from "../cities/ICity";

export interface IEvent {
    id: number;
    isFree: boolean;
    name: string
    city: number | ICity | undefined;
    startDate: string;
    endDate: string;
}

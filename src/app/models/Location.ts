import {Country} from "./Country";

export interface Location{
    id: number;
    streetAddress: string;
    streetNumber: number;
    postalCode: string;
    city: string;
    country: Country;
}

import {Location} from "./Location";
export interface User{
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    isLoggedIn: boolean;
    location: Location;
}

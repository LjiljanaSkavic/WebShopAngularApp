import { Location } from "./Location";

export interface LoginUserInfo {
  username: string;
  password: string;
}

export interface User extends LoginUserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  activationPin: number;
  isLoggedIn: boolean;
  isActivated: boolean;
  location: Location;
}

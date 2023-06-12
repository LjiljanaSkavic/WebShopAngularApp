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
  imageAvatar: string;
  activationPin: number;
  isLoggedIn: boolean;
  isActivated: boolean;
  location: Location;
}

export interface NewUser extends LoginUserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRequest extends NewUser {
  imageAvatar: string;
  activationPin: number;
  isLoggedIn: boolean;
  isActivated: boolean;
  locationId: number;
  countryId: number;
}



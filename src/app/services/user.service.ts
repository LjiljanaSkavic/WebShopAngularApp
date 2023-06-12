import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserRequest } from "../models/User";
import { LocalService } from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:9000/users"

  constructor(private httpClient: HttpClient,
              private localStore: LocalService) {
  }

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  getUser(id: number): Observable<User> {
    const userWithIdUrl = `http://localhost:9000/users/${ id }`
    return this.httpClient.get<User>(userWithIdUrl);
  }

  getLoggedUser(): string | null {
    return this.localStore.getData('loggedUser');
  }

  changePassword(user: User, passwordHash: string): Observable<User> {
    const changePasswordUrl = `http://localhost:9000/users/${ user.id }`;
    const userRequest: UserRequest = {
      activationPin: user.activationPin,
      countryId: user.location.country.id,
      email: user.email,
      firstName: user.firstName,
      imageAvatar: user.imageAvatar,
      isActivated: user.isActivated,
      isLoggedIn: user.isLoggedIn,
      lastName: user.lastName,
      locationId: user.location.id,
      password: passwordHash,
      username: user.username
    }
    return this.httpClient.put<User>(changePasswordUrl, userRequest);
  }

  setUserAsLoggedIn(user: User) {
    this.localStore.saveData('loggedUser', JSON.stringify(user));
    this._isLoggedIn = true;
  }

  setUserAsLoggedOut() {
    this.localStore.removeData('loggedUser');
    this._isLoggedIn = false;
  }
}

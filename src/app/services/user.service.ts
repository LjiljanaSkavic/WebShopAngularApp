import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/User";
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

  setUserAsLoggedIn(user: User) {
    this.localStore.saveData('loggedUser', JSON.stringify(user));
    this._isLoggedIn = true;
  }

  setUserAsLoggedOut() {
    this.localStore.removeData('loggedUser');
    this._isLoggedIn = false;
  }
}

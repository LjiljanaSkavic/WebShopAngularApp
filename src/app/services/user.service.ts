import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:9000/users"

  constructor(private httpClient: HttpClient) {

  }

  private _userId: number;

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  private _isActivated = false;

  get isActivated(): boolean {
    return this._isActivated;
  }

  set isActivated(value: boolean) {
    this._isActivated = value;
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
}

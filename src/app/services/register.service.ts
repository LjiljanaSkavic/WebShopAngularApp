import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { NewUser, User } from "../models/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = "http://localhost:9000/register";

  constructor(private httpClient: HttpClient) {
  }

  private _activationPin: number;

  get activationPin(): number {
    return this._activationPin;
  }

  set activationPin(value: number) {
    this._activationPin = value;
  }

  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  createUser(user: NewUser): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  activateProfile(id: number): Observable<User> {
    const activationUrl = `http://localhost:9000/register/${ id }`;
    return this.httpClient.put<User>(activationUrl, {});
  }
}

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { NewUser, User } from "../models/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  baseUrl = "http://localhost:9000/register";
  private _email: string;

  constructor(private _httpClient: HttpClient) {
  }

  createUser(user: NewUser): Observable<User> {
    return this._httpClient.post<User>(this.baseUrl, user);
  }

  sendEmail(id: number): Observable<number> {
    const activationUrl = `${this.baseUrl}/activate/${id}`;
    return this._httpClient.put<number>(activationUrl, {});
  }
}

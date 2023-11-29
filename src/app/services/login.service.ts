import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginUserInfo, User } from "../models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:9000/login";

  constructor(private _httpClient: HttpClient) {
  }

  findUserByUsernameAndPassword(username: string, password: string): Observable<User> {
    const loginUserInfo: LoginUserInfo = {
      username: username,
      password: password
    }
    return this._httpClient.post<User>(this.baseUrl, loginUserInfo);
  }

  activateUser(id: number): Observable<User> {
    const activationUrl = `http://localhost:9000/login/${id}`;
    return this._httpClient.put<User>(activationUrl, {});
  }
}

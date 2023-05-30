import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginUserInfo, User } from "../models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:9000/login";

  constructor(private httpClient: HttpClient) {
  }

  getUserByUsernameAndPassword(username: string, password: string): Observable<User> {
    const loginUserInfo: LoginUserInfo = {
      username: username,
      password: password
    }
    return this.httpClient.put<User>(this.baseUrl, loginUserInfo);
  }

  logInUser(id: number): Observable<User> {
    const logInUrl = `http://localhost:9000/login/${ id }`;
    return this.httpClient.put<User>(logInUrl, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface LoginUserInfo {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:9000/login";

  constructor(private httpClient: HttpClient) {
  }

  getUserByUsernameAndPassword(username: string, password: string) {
    const loginUserInfo: LoginUserInfo = {
      username: username,
      password: password
    }
    return this.httpClient.put<LoginUserInfo>(this.baseUrl, loginUserInfo);
  }
}

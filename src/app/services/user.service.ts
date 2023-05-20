import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:9000/users"

  constructor(private httpClient: HttpClient) {

  }

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

}

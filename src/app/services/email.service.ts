import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Email } from "../models/Email";

const URL = 'http://localhost:9000/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUrl = "";

  constructor(private http: HttpClient) {
    this.baseUrl = URL;
  }

  public send(email: Email): Observable<Email> {
    return this.http.post<Email>(this.baseUrl, email);
  }
}

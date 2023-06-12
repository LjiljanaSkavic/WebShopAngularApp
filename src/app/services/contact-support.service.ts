import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class ContactSupportService {
  baseUrl = "http://localhost:9000/contact-support-messages";

  constructor(private _httpClient: HttpClient) {
  }

  createMessage(message: Message): Observable<Message> {
    return this._httpClient.post<Message>(this.baseUrl, message);
  }
}

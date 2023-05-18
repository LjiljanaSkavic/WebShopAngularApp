import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/Country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = "http://localhost:9000/countries"

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrl);
  }
}

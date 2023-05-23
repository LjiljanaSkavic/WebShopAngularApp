import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:9000/categories"

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

  getAllChildren(id: number): Observable<Category[]> {
    const childrenUrl = `http://localhost:9000/categories/${ id }/children`;
    return this.httpClient.get<Category[]>(childrenUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:9000/products"

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  getAllFromCategoryWithId(categoryId: number) {
    const productsFromCategoryUrl = `http://localhost:9000/products/filter-by-category/${ categoryId }`
    return categoryId === 0 ? this.getAll() : this.httpClient.get<Product[]>(productsFromCategoryUrl);
  }

  getAllFromSearchTerm(query: string) {
    const productsFromQuery = `http://localhost:9000/products/search-by-query/${ query }`
    return query === "" ? this.getAll() : this.httpClient.get<Product[]>(productsFromQuery);
  }

  getAllByCategoryAndSearchTerm(categoryId: number, query: string) {
    const productsFromCategoryAndQuery = `http://localhost:9000/filter-by-category/${ categoryId }/search-by-query/${ query }"`;
  }
}

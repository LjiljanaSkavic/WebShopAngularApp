import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { AttributeValue } from "../models/AttributeValue";

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

  getById(id: number): Observable<Product> {
    const getByIdUrl = `http://localhost:9000/products/${ id }`;
    return this.httpClient.get<Product>(getByIdUrl);
  }

  getBySellerId(id: number): Observable<Product[]> {
    const getBySellerId = `http://localhost:9000/products/seller/${ id }`;
    return this.httpClient.get<Product[]>(getBySellerId);
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

  getAllAttributes(productId: number): Observable<AttributeValue[]> {
    const getAttributesUrl = `http://localhost:9000/attributes/of-product/${ productId }`;
    return this.httpClient.get<AttributeValue[]>(getAttributesUrl);
  }

  delete(id: number): Observable<Product> {
    const deleteProductUrl = `http://localhost:9000/products/delete/${ id }`;
    return this.httpClient.put<Product>(deleteProductUrl, {});
  }

}

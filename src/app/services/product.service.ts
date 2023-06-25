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

  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    const getAllUrl = "http://localhost:9000/products/all"
    return this._httpClient.get<Product[]>(getAllUrl);
  }

  getById(id: number): Observable<Product> {
    const getByIdUrl = `http://localhost:9000/products/${ id }`;
    return this._httpClient.get<Product>(getByIdUrl);
  }

  getBySellerId(id: number): Observable<Product[]> {
    const getBySellerId = `http://localhost:9000/products/seller/${ id }`;
    return this._httpClient.get<Product[]>(getBySellerId);
  }

  getAllFromCategoryWithId(categoryId: number) {
    const productsFromCategoryUrl = `http://localhost:9000/products/filter-by-category/${ categoryId }`
    return categoryId === 0 ? this.getAll() : this._httpClient.get<Product[]>(productsFromCategoryUrl);
  }

  getAllFromSearchTerm(query: string) {
    const productsFromQueryUrl = `http://localhost:9000/products/search-by-query/${ query }`
    return this._httpClient.get<Product[]>(productsFromQueryUrl);
  }

  getAllByCategoryAndSearchTerm(categoryId: number, query: string) {
    if (categoryId === 0) {
      return this.getAllFromSearchTerm(query);
    } else {
      const productsFromCategoryAndQuery = `http://localhost:9000/filter-by-category/${ categoryId }/search-by-query/${ query }"`;
      return this._httpClient.get<Product[]>(productsFromCategoryAndQuery);
    }
  }

  getAllAttributes(productId: number): Observable<AttributeValue[]> {
    const getAttributesUrl = `http://localhost:9000/attributes/of-product/${ productId }`;
    return this._httpClient.get<AttributeValue[]>(getAttributesUrl);
  }

  delete(id: number): Observable<Product> {
    const deleteProductUrl = `http://localhost:9000/products/delete/${ id }`;
    return this._httpClient.put<Product>(deleteProductUrl, {});
  }

}

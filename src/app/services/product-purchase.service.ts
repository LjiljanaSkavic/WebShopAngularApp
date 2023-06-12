import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductPurchase, ProductPurchaseDetails, ProductPurchaseRequest } from "../models/ProductPurchase";

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {

  constructor(private _httpClient: HttpClient) {
  }

  getPurchasesByCustomerId(customerId: number): Observable<ProductPurchaseDetails[]> {
    const productPurchaseByCustomerIdUrl = `http://localhost:9000/product-purchase/customer/${ customerId }`;
    return this._httpClient.get<ProductPurchaseDetails[]>(productPurchaseByCustomerIdUrl);
  }

  insertPurchase(productPurchase: ProductPurchaseRequest): Observable<ProductPurchase> {
    const productPurchaseInsertUrl = `http://localhost:9000/product-purchase`;
    return this._httpClient.post<ProductPurchase>(productPurchaseInsertUrl, productPurchase);
  }

  deleteProductPurchaseById(productPurchaseId: number): Observable<ProductPurchase> {
    const deleteProductPurchaseByIdUrl = `http://localhost:9000/product-purchase/delete/${ productPurchaseId }`;
    return this._httpClient.put<ProductPurchase>(deleteProductPurchaseByIdUrl, {});
  }
}

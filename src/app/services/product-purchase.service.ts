import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductPurchase } from "../models/ProductPurchase";

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {

  constructor(private httpClient: HttpClient) {
  }

  getPurchasesByCustomerId(customerId: number): Observable<ProductPurchase[]> {
    const productPurchaseByCustomerIdUrl = `http://localhost:9000/product-purchase/customer/${ customerId }`;
    return this.httpClient.get<ProductPurchase[]>(productPurchaseByCustomerIdUrl);
  }

  deleteProductPurchaseById(productPurchaseId: number): Observable<ProductPurchase> {
    const deleteProductPurchaseByIdUrl = `http://localhost:9000/product-purchase/delete/${ productPurchaseId }`;
    return this.httpClient.put<ProductPurchase>(deleteProductPurchaseByIdUrl, {});
  }
}
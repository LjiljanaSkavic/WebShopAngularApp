import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  productId: number;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.productId = params['id'];
        return this.productService.getById(this.productId)
      })).subscribe(product => {
        this.product = product;
        console.log(product);
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { SharedService } from "../../services/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../models/Product";
import { Subscription, switchMap } from "rxjs";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  sellerId: number;
  subs = new Subscription();

  constructor(private productService: ProductService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.sellerId = params['id'];
        return this.productService.getBySellerId(this.sellerId)
      })).subscribe(products => {
        this.products = products;
      }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

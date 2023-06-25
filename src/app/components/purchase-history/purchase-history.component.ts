import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ProductPurchase, ProductPurchaseDetails } from "../../models/ProductPurchase";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { Subscription } from "rxjs";
import { User } from "../../models/User";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {
  productPurchases: ProductPurchaseDetails[] = []
  subs = new Subscription();

  constructor(private _userService: UserService,
              private _router: Router,
              private _productPurchaseService: ProductPurchaseService) {
  }

  productPurchaseTrack(index: number, item: ProductPurchase): ProductPurchase {
    return item;
  }

  ngOnInit() {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.subs.add(this._productPurchaseService.getPurchasesByCustomerId(user.id).subscribe(productPurchases => {
        this.productPurchases = productPurchases;
      }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

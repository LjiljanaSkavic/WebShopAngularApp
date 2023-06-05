import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ProductPurchase } from "../../models/ProductPurchase";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { Subscription } from "rxjs";
import { User } from "../../models/User";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {
  productPurchases: ProductPurchase[] = []
  subs = new Subscription();

  constructor(private userService: UserService,
              private router: Router, private productPurchaseService: ProductPurchaseService) {
  }

  ngOnInit() {
    const userString = this.userService.getLoggedUser();
    if (userString != null) {
      const user: User = JSON.parse(userString);
      this.subs.add(this.productPurchaseService.getPurchasesByCustomerId(user.id).subscribe(productPurcahses => this.productPurchases = productPurcahses));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

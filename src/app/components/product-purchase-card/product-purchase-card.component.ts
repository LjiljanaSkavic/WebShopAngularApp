import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PAYMENT_TYPE, ProductPurchase } from "../../models/ProductPurchase";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-product-purchase-card',
  templateUrl: './product-purchase-card.component.html',
  styleUrls: ['./product-purchase-card.component.scss']
})
export class ProductPurchaseCardComponent implements OnInit, OnDestroy {
  @Input() productPurchase: ProductPurchase;
  subs = new Subscription();
  protected readonly PAYMENT_TYPE = PAYMENT_TYPE;

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteProductPurchaseClick() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

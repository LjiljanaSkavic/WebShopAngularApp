import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PAYMENT_TYPE, ProductPurchase } from "../../models/ProductPurchase";
import { Observable, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent, DIALOG_RESPONSE } from "../confirmation-modal/confirmation-modal.component";
import { ProductPurchaseService } from "../../services/product-purchase.service";

@Component({
  selector: 'app-product-purchase-card',
  templateUrl: './product-purchase-card.component.html',
  styleUrls: ['./product-purchase-card.component.scss']
})
export class ProductPurchaseCardComponent implements OnInit, OnDestroy {
  @Input() productPurchase: ProductPurchase;
  subs = new Subscription();
  protected readonly PAYMENT_TYPE = PAYMENT_TYPE;

  constructor(public dialog: MatDialog,
              private productPurchaseService: ProductPurchaseService) {
  }

  ngOnInit() {
  }

  onDeleteProductPurchaseClick() {
    //TODO add to constants and show message
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete purchase",
        text: "Are you sure that you want to delete this purchase?"
      }
    }).afterClosed().pipe(switchMap(dialogResponse => {
      if (dialogResponse === DIALOG_RESPONSE.YES) {
        console.log('deletinggggg')
        return this.productPurchaseService.deleteProductPurchaseById(this.productPurchase.id)
      } else {
        return new Observable<DIALOG_RESPONSE.NO>;
      }
    })).subscribe(result => {
      //TODO: Fix this
      console.log('result', result);
      if (result !== DIALOG_RESPONSE.NO) {
        console.log('deleted');
      } else {
        console.log('no')
      }
    });

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

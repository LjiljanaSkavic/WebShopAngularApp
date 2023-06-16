import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PAYMENT_TYPE, PAYMENT_TYPE_OPTIONS, ProductPurchaseDetails } from "../../models/ProductPurchase";
import { Observable, Subscription, switchMap } from "rxjs";
import { ConfirmationModalComponent, DIALOG_RESPONSE } from "../confirmation-modal/confirmation-modal.component";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ERROR_HAS_OCCURRED_MESSAGE } from "../../shared/constants";

export const snackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'top',
}
export const DELETE_MODAL_PURCHASE = {
  TITLE: 'Delete purchase',
  TEXT: 'Are you sure that you want to delete this purchase?',
  SUCCESS: 'Purchase successfully deleted.'
}


@Component({
  selector: 'app-product-purchase-card',
  templateUrl: './product-purchase-card.component.html',
  styleUrls: ['./product-purchase-card.component.scss']
})
export class ProductPurchaseCardComponent implements OnInit, OnDestroy {
  @Input() productPurchase: ProductPurchaseDetails;
  subs = new Subscription();
  protected readonly PAYMENT_TYPE = PAYMENT_TYPE;
  protected readonly PAYMENT_TYPE_OPTIONS = PAYMENT_TYPE_OPTIONS;

  constructor(private _productPurchaseService: ProductPurchaseService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onDeleteProductPurchaseClick() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: DELETE_MODAL_PURCHASE.TITLE,
        text: DELETE_MODAL_PURCHASE.TEXT
      }
    }).afterClosed().pipe(switchMap(dialogResponse => {
      if (dialogResponse === DIALOG_RESPONSE.YES) {
        return this._productPurchaseService.deleteProductPurchaseById(this.productPurchase.id)
      } else {
        return new Observable<DIALOG_RESPONSE.NO>;
      }
    })).subscribe((result) => {
        if (result === DIALOG_RESPONSE.NO) {
          this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig)
        } else {
          this._snackBar.open(DELETE_MODAL_PURCHASE.SUCCESS, "OK", snackBarConfig)
        }
      },
      (err) => {
        this._snackBar.open(DELETE_MODAL_PURCHASE.SUCCESS, "OK", snackBarConfig)
      }
    );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

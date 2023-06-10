import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PAYMENT_TYPE, PAYMENT_TYPE_OPTIONS, ProductPurchaseDetails } from "../../models/ProductPurchase";
import { Observable, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent, DIALOG_RESPONSE } from "../confirmation-modal/confirmation-modal.component";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  constructor(public dialog: MatDialog,
              private productPurchaseService: ProductPurchaseService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onDeleteProductPurchaseClick() {
    //TODO add to constants 
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete purchase",
        text: "Are you sure that you want to delete this purchase?"
      }
    }).afterClosed().pipe(switchMap(dialogResponse => {
      if (dialogResponse === DIALOG_RESPONSE.YES) {
        return this.productPurchaseService.deleteProductPurchaseById(this.productPurchase.id)
      } else {
        return new Observable<DIALOG_RESPONSE.NO>;
      }
    })).subscribe((result) => {
        if (result !== DIALOG_RESPONSE.NO) {
          this._snackBar.open("An error has occurred.", "OK", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }
      },
      (err) => {
        this._snackBar.open("Purchase successfully deleted.", "OK", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

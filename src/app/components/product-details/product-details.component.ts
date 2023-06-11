import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/Comment";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";
import { AttributeValue } from "../../models/AttributeValue";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent, DIALOG_RESPONSE } from "../confirmation-modal/confirmation-modal.component";
import { ProductPurchaseRequest } from "../../models/ProductPurchase";
import { SharedService } from "../../services/shared.service";
import { BuyProductModalComponent } from "../buy-product-modal/buy-product-modal.component";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ERROR_HAS_OCCURRED_MESSAGE, snackBarConfig } from "../product-purchase-card/product-purchase-card.component";

export const DEFAULT_ANIMATION_DURATION = 100;

export const BUY_PRODUCT_MODAL = {
  TITLE: 'Buy product',
  TEXT: 'Are you sure that you want to buy this product?',
  SUCCESS: 'Product successfully purchased.'
}

export const DELETE_PRODUCT_MODAL = {
  TITLE: 'Delete product',
  TEXT: 'Are you sure that you want to delete this product?',
  SUCCESS: 'Product successfully deleted.'
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-out'))
    ])
  ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  productId: number;
  userId = 0;
  product: Product;
  comments: Comment[];
  attributes: AttributeValue[];
  collapsed = true;
  isLoading = true;
  isLoggedIn = false;
  isMyProduct = false;

  constructor(private commentService: CommentService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private userService: UserService,
              private sharedService: SharedService,
              private productPurchaseService: ProductPurchaseService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;

    const userString = this.userService.getLoggedUser();
    if (userString != null) {
      const user: User = JSON.parse(userString);
      this.userId = user.id;
    }

    this.subs.add(this.activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.productId = params['id'];
        return this.productService.getById(this.productId)
      })).pipe(switchMap(product => {
        this.product = product;
        this.initializeIsMyProduct();
        return this.commentService.getCommentsByProductId(product.id)
      })).pipe(switchMap(comments => {
        this.comments = comments;
        return this.productService.getAllAttributes(this.productId)
      })).subscribe(attributes => {
        this.attributes = attributes;
        this.isLoading = false;
      }));
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onBuyNowClick() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: BUY_PRODUCT_MODAL.TITLE,
        text: BUY_PRODUCT_MODAL.TEXT
      }
    }).afterClosed().pipe(switchMap(result => {
      if (result != DIALOG_RESPONSE.NO) {
        return this.dialog.open(BuyProductModalComponent, {
          data: {
            userId: this.userId,
            productId: this.productId
          }
        }).afterClosed()
      } else {
        return new Observable<DIALOG_RESPONSE.NO>();
      }
    })).subscribe(result => {
      if ((result !== DIALOG_RESPONSE.DISCARD) && (result !== DIALOG_RESPONSE.NO)) {
        const paymentType: string = result
        const productPurchaseRequest: ProductPurchaseRequest = {
          id: 0,
          dateTime: new Date(),
          isDeleted: false,
          orderId: this.sharedService.getRandomEightCharactersLongString(),
          paymentType: parseInt(paymentType),
          productId: this.productId,
          userId: this.userId
        }
        this.subs.add(this.productPurchaseService.insertPurchase(productPurchaseRequest).subscribe((res) => {
            this._snackBar.open(BUY_PRODUCT_MODAL.SUCCESS, "OK", snackBarConfig);
            this.router.navigateByUrl('/purchase-history').catch(err => console.log(err));
          },
          (err) => {
            this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
          }
        ));
      }
    });
  }

  onDeleteProductClick() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: DELETE_PRODUCT_MODAL.TITLE,
        text: DELETE_PRODUCT_MODAL.TEXT
      }
    }).afterClosed().pipe(switchMap(result => {
      return result === DIALOG_RESPONSE.YES ? this.productService.delete(this.productId) : new Observable<DIALOG_RESPONSE.NO>()
    })).subscribe((res) => {
      if (res !== DIALOG_RESPONSE.NO) {
        this._snackBar.open(DELETE_PRODUCT_MODAL.SUCCESS, "OK", snackBarConfig);
        this.router.navigateByUrl("web-shop").catch(res => console.log(res));
      }
    }, (err) => this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig));
  }

  initializeIsMyProduct() {
    const userString = this.userService.getLoggedUser();
    if (userString != null) {
      const user: User = JSON.parse(userString);
      this.isMyProduct = user.id === this.product.sellerUser.id;
    }
  }
}

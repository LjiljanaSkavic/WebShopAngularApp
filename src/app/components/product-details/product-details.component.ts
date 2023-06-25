import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { CommentService } from "../../services/comment.service";
import { Comment, CommentRequest } from "../../models/Comment";
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
import { snackBarConfig } from "../product-purchase-card/product-purchase-card.component";
import { FormControl, FormGroup } from "@angular/forms";
import { ERROR_HAS_OCCURRED_MESSAGE } from "../../shared/constants";

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
  isLoading = true;
  isLoggedIn = false;
  isMyProduct = false;
  leaveCommentForm: FormGroup;


  constructor(private _commentService: CommentService,
              private _activatedRoute: ActivatedRoute,
              private _productService: ProductService,
              private _userService: UserService,
              private _sharedService: SharedService,
              private _productPurchaseService: ProductPurchaseService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.userId = user.id;
      this.isLoggedIn = true;
      this.leaveCommentForm = new FormGroup(
        {
          commentContent: new FormControl('')
        });
    }

    this.subs.add(this._activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.productId = parseInt(params['id']);
        return this._productService.getById(this.productId)
      })).pipe(switchMap(product => {
        this.product = product;
        this.initializeIsMyProduct();
        return this._commentService.getCommentsByProductId(product.id)
      })).pipe(switchMap(comments => {
        this.comments = comments;
        return this._productService.getAllAttributes(this.productId)
      })).subscribe(attributes => {
        this.attributes = attributes;
        this.isLoading = false;
      }));
  }

  onBuyNowClick() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: BUY_PRODUCT_MODAL.TITLE,
        text: BUY_PRODUCT_MODAL.TEXT
      }
    }).afterClosed().pipe(switchMap(result => {
      if (result !== DIALOG_RESPONSE.NO) {
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
          orderId: this._sharedService.getRandomEightCharactersLongString(),
          paymentType: parseInt(paymentType),
          productId: this.productId,
          userId: this.userId
        }
        this.subs.add(this._productPurchaseService.insertPurchase(productPurchaseRequest).subscribe((res) => {
            this._snackBar.open(BUY_PRODUCT_MODAL.SUCCESS, "OK", snackBarConfig);
            this._router.navigateByUrl('/purchase-history').catch(err => console.log(err));
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
      return result === DIALOG_RESPONSE.YES ? this._productService.delete(this.productId) : new Observable<DIALOG_RESPONSE.NO>()
    })).subscribe((res) => {
        if (res !== DIALOG_RESPONSE.NO) {
          this._snackBar.open(DELETE_PRODUCT_MODAL.SUCCESS, "OK", snackBarConfig);
          this._router.navigateByUrl("web-shop").catch(res => console.log(res));
        }
      },
      (err) => this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig));
  }

  initializeIsMyProduct() {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.isMyProduct = user.id === this.product.sellerUser.id;
    }
  }

  onPostCommentClick() {
    const commentContent = this.leaveCommentForm.get('commentContent')?.value;
    const commentRequest: CommentRequest = {
      content: commentContent,
      dateTime: new Date(),
      productId: this.productId,
      userId: this.userId
    }

    this.subs.add(
      this._commentService.insertComment(commentRequest).subscribe(
        res => {
          this._snackBar.open("Comment successfully added.", "OK", snackBarConfig);
          this.reloadComments();
          this.leaveCommentForm.reset();
        },
        err => {
          this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
        }
      ));
  }

  reloadComments() {
    this.subs.add(this._commentService.getCommentsByProductId(this.product.id).subscribe(res => this.comments = res));
  }

  commentTrack(index: number, item: Comment): Comment {
    return item;
  }

  attributeValueTrack(index: number, item: AttributeValue): AttributeValue {
    return item;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

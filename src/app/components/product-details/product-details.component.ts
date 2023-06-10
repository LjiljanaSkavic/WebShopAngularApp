import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/Comment";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";
import { AttributeValue } from "../../models/AttributeValue";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { ProductPurchase } from "../../models/ProductPurchase";
import { SharedService } from "../../services/shared.service";
import { BuyProductModalComponent } from "../buy-product-modal/buy-product-modal.component";

export const DEFAULT_ANIMATION_DURATION = 100;

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
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
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
    //TODO add to constants and show message
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Buy product",
        text: "Are you sure that you want to buy this product?"
      }
    }).afterClosed().pipe(switchMap(result => {
      return this.dialog.open(BuyProductModalComponent, {}).afterClosed()
    })).subscribe(result => {
      console.log(result);
      const productPurchase: ProductPurchase = {
        dateTime: new Date(),
        id: 0,
        isDeleted: false,
        orderId: this.sharedService.getRandomEightCharactersLongString(),
        paymentType: 0
      }
      console.log(productPurchase);
    });
  }

  onDeleteProductClick() {
    //TODO add to constants and show message
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete product",
        text: "Are you sure that you want to delete this product?"
      }
    }).afterClosed().subscribe(result => console.log(result));
  }

  initializeIsMyProduct() {
    const userString = this.userService.getLoggedUser();
    if (userString != null) {
      const user: User = JSON.parse(userString);
      this.isMyProduct = user.id === this.product.sellerUser.id;
    }
  }
}

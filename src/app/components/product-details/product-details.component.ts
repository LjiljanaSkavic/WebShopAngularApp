import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/Comment";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  productId: number;
  product: Product;
  comments: Comment[];
  collapsed = true;

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.productId = params['id'];
        return this.productService.getById(this.productId)
      })).pipe(switchMap(product => {
        this.product = product;
        return this.commentService.getCommentsByProductId(product.id)
      })).subscribe(comments => {
        this.comments = comments;
      }));
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

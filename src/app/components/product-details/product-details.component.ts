import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { CommentService } from "../../services/comment.service";
import { Comment } from "../../models/Comment";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  productId: number;
  product: Product;
  comments: Comment[];

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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { Subscription, switchMap } from "rxjs";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subs = new Subscription();

  constructor(private productService: ProductService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.productService.getAll().subscribe(products => this.products = products));
    this.subs.add(
      this.sharedService.newCategorySelected.pipe(switchMap(categoryId => {
        return this.productService.getAllFromCategoryWithId(categoryId)
      })).subscribe(productsFromCategory => this.products = productsFromCategory)
    );
    this.subs.add(
      this.sharedService.newQueryWritten.pipe(switchMap(searchTerm => {
        return this.productService.getAllFromSearchTerm(searchTerm)
      })).subscribe(productsFromCategory => this.products = productsFromCategory)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

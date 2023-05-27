import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { Observable, Subscription, switchMap } from "rxjs";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subs = new Subscription();
  @Input() selectedCategoryChanged: Observable<number>;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.productService.getAll().subscribe(products => this.products = products));
    this.subs.add(
      this.selectedCategoryChanged.pipe(switchMap(categoryId => {
        return this.productService.getAllFromCategoryWithId(categoryId)
      })).subscribe(productsFromCategory => this.products = productsFromCategory)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

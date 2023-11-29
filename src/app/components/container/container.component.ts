import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { Subscription, switchMap } from "rxjs";
import { SharedService } from "../../services/shared.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  allProducts: Product[] = [];
  products: Product[] = [];
  isLoading = true;

  pageSize = 5;
  pageIndex = 0;
  totalSize: number;

  hasContent = false;

  subs = new Subscription();
  text = "There is no products to show.";

  constructor(private _productService: ProductService,
              private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.subs.add(
      this._productService.getAll().subscribe(products => {
        this.allProducts = products;
        this.totalSize = products.length;
        this.products = products.slice(0, this.pageSize);
        this.hasContent = products.length > 0;
        this.isLoading = false;
      }));

    this.subs.add(
      this._sharedService.newCategorySelected.pipe(
        switchMap(categoryId => {
          return this._productService.getAllFromCategoryWithId(categoryId)
        })).subscribe(productsFromCategory => {
        this.allProducts = productsFromCategory;
        this.hasContent = productsFromCategory.length > 0;
        this.totalSize = productsFromCategory.length;
        this.products = productsFromCategory.slice(0, this.pageSize);
      })
    );

    this.subs.add(
      this._sharedService.newQueryWritten.pipe(switchMap(searchTerm => {
        return this._productService.getAllFromSearchTerm(searchTerm)
      })).subscribe(productsFromSearch => {
        this.hasContent = productsFromSearch.length > 0;
        this.allProducts = productsFromSearch;
        this.products = productsFromSearch.slice(0, this.pageSize);
        this.totalSize = productsFromSearch.length;
      })
    );
  }

  onCardClick(product: Product) {
    this._router.navigate(['product-details'], {queryParams: {id: product.id}}).catch(err => console.log(err));
  }

  productTrack(index: number, item: Product): Product {
    return item;
  }

  onPageChangedClick(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.totalSize = event.length;
    this.reloadPageItems();
  }

  reloadPageItems() {
    const firstIndex = this.pageIndex * this.pageSize;
    const lastIndex = (this.pageIndex + 1) * this.pageSize;
    this.products = this.allProducts.slice(firstIndex, lastIndex);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

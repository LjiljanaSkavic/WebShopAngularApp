import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { Observable, Subscription, switchMap } from "rxjs";
import { SharedService } from "../../services/shared.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  productsObservable: Observable<any>;
  productsDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  products: Product[] = [];

  pageSize = 10;
  currentPage = 0;
  totalSize = 0;

  subs = new Subscription();

  constructor(private productService: ProductService,
              private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.productService.getAll().subscribe(products => {
        this.products = products;
        this.totalSize = this.products.length;

        this.productsDataSource.data = products;
        this.productsDataSource.paginator = this.paginator;
        this.productsObservable = this.productsDataSource.connect();
      }));

    this.subs.add(
      this.sharedService.newCategorySelected.pipe(switchMap(categoryId => {
        return this.productService.getAllFromCategoryWithId(categoryId)
      })).subscribe(productsFromCategory => {
        this.products = productsFromCategory;
        this.totalSize = this.products.length;
        this.productsDataSource.data = productsFromCategory;
      })
    );

    this.subs.add(
      this.sharedService.newQueryWritten.pipe(switchMap(searchTerm => {
        return this.productService.getAllFromSearchTerm(searchTerm)
      })).subscribe(productsFromSearch => {
        this.products = productsFromSearch;
        this.totalSize = this.products.length;
        this.productsDataSource.data = productsFromSearch;
      })
    );
  }

  onCardClick(product: Product) {
    this.router.navigate(['product-details'], {queryParams: {id: product.id}}).catch(err => console.log(err));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { SharedService } from "../../services/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, switchMap } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../../models/Product";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productsObservable: Observable<any>;
  productsDataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  sellerId: number;
  subs = new Subscription();
  products: Product[] = [];

  pageSize = 5;
  currentPage = 0;
  totalSize = 0;

  constructor(private productService: ProductService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.sellerId = params['id'];
        return this.productService.getBySellerId(this.sellerId)
      })).subscribe(products => {
        this.products = products;
        this.totalSize = this.products.length;
        this.productsDataSource.data = products;
        this.productsDataSource.paginator = this.paginator;
        this.productsObservable = this.productsDataSource.connect();
      }));
  }

  onCardClick(product: Product) {
    this.router.navigate(['product-details'], {queryParams: {id: product.id}}).catch(err => console.log(err));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

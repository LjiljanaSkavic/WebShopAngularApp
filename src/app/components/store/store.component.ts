import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../../services/product.service";
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
  isLoading = true;

  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  hasContent = false;

  text = "You don't have any products in your store yet.";

  constructor(private _productService: ProductService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.add(this._activatedRoute.queryParams
      .pipe(switchMap(params => {
        this.sellerId = params['id'];
        return this._productService.getBySellerId(this.sellerId)
      })).subscribe(products => {
        console.log('products', this.products);
        this.products = products;
        this.totalSize = this.products.length;
        this.hasContent = this.products.length > 0;
        this.productsDataSource.data = products;
        this.productsDataSource.paginator = this.paginator;
        this.productsObservable = this.productsDataSource.connect();
        this.isLoading = false;
      }));
  }

  onCardClick(product: Product) {
    this._router.navigate(['product-details'], {queryParams: {id: product.id}}).catch(err => console.log(err));
  }

  productTrack(index: number, item: Product): Product {
    return item;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

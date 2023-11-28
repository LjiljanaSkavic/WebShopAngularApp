import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductPurchase, ProductPurchaseDetails} from "../../models/ProductPurchase";
import {ProductPurchaseService} from "../../services/product-purchase.service";
import {Observable, Subscription} from "rxjs";
import {User} from "../../models/User";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productPurchaseObservable: Observable<any>;
  productPurchases: ProductPurchaseDetails[] = []
  subs = new Subscription();

  productPurchasesDataSource: MatTableDataSource<ProductPurchaseDetails> = new MatTableDataSource<ProductPurchaseDetails>();

  isLoading = true;

  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  hasContent = false;
  text = "You don't have any product purchases ih history yet.";

  constructor(private _userService: UserService,
              private _productPurchaseService: ProductPurchaseService) {
  }

  productPurchaseTrack(index: number, item: ProductPurchase): ProductPurchase {
    return item;
  }

  ngOnInit() {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.subs.add(this._productPurchaseService.getPurchasesByCustomerId(user.id).subscribe(productPurchases => {
        this.productPurchases = productPurchases;
        this.totalSize = this.productPurchases.length;
        this.hasContent = this.productPurchases.length > 0;
        this.productPurchasesDataSource.data = productPurchases;
        this.productPurchasesDataSource.paginator = this.paginator;
        this.productPurchaseObservable = this.productPurchasesDataSource.connect();
        this.isLoading = false;
      }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

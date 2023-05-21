import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subs = new Subscription();

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.subs.add(
      this.productService.getAll().subscribe(products => this.products = products));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}

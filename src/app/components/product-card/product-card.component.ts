import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../../models/Product";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  isLoggedIn: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
  }
}

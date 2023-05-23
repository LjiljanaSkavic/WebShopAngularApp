import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../../models/Product";
import { UserService } from "../../services/user.service";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";

let DEFAULT_DURATION = 300;

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  isLoggedIn: boolean;
  collapsed = true;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {CountryService} from "../../services/country.service";
import {UserService} from "../../services/user.service";
import {CategoryService} from "../../services/category.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private countryService: CountryService, private userService: UserService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.countryService.getAll().subscribe(res => console.log(res));
    this.userService.getAll().subscribe(res => console.log(res));
    console.log(this.product);
  }

}

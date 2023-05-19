import { Component, OnInit } from '@angular/core';
import { CountryService } from "../../services/country.service";
import { UserService } from "../../services/user.service";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private countryService: CountryService, private userService: UserService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.countryService.getAll().subscribe(res => console.log(res));
    this.userService.getAll().subscribe(res => console.log(res));
  }

}

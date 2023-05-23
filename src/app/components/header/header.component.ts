import { Component, OnInit } from '@angular/core';
import { Category } from "../../models/Category";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  searchTerm = "";
  showFiller = false;
  categories: Category[] = [];
  subcategories: Category[] = [];
  showSubcategories = false;

  constructor(private categoryService: CategoryService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
        this.categories = categories;
        console.log(categories);
      }
    )
  }

  categoryTrack(index: number, item: Category): number {
    return item.id;
  }

  subCategoryTrack(index: number, item: Category): number {
    return item.id;
  }

  getSubcategories(id: number): void {
    this.categoryService.getAllChildren(id).subscribe(categories => {
      console.log('categories from back', categories);
      this.subcategories = categories;
      console.log('here subcategories', this.subcategories);
    });
  }


  onProfileClick() {
    this.userService.isLoggedIn ? this.router.navigateByUrl('my-profile').then(r => console.log('my profile')) : this.router.navigateByUrl('login').then(r => console.log('login'));
  }


  onShoppingCartClick() {
    this.router.navigateByUrl('shopping-cart').then(r => console.log('my cart'));
  }

  toggleSubcategories(parentId: number) {
    this.showSubcategories = !this.showSubcategories;
    this.getSubcategories(parentId);
    console.log('from toggle ', this.subcategories);
  }
}

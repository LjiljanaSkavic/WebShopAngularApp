import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from "../../models/Category";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm = "";
  showFiller = false;
  allCategories: Category[] = [];
  rootCategories: Category[] = [];
  subcategories: Category[] = [];
  showSubcategories = false;
  subs = new Subscription();

  constructor(private categoryService: CategoryService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.subs.add(this.categoryService.getAll().subscribe(categories => {
        this.allCategories = categories;
        this.rootCategories = categories.filter(category => !category.parentCategory);
        console.log(this.rootCategories);
      }
    ));
  }

  categoryTrack(index: number, item: Category): number {
    return item.id;
  }

  subCategoryTrack(index: number, item: Category): number {
    return item.id;
  }

  getSubcategories(id: number): void {
    this.categoryService.getAllChildren(id).subscribe(categories => {
      this.subcategories = categories;
    });
  }

  toggleSubcategories(parentId: number) {
    this.showSubcategories = !this.showSubcategories;
    if (this.showSubcategories) {
      this.getSubcategories(parentId);
    }
  }


  onProfileClick() {
    this.userService.isLoggedIn ? this.router.navigateByUrl('my-profile').then(r => console.log('my profile')) : this.router.navigateByUrl('login').then(r => console.log('login'));
  }


  onShoppingCartClick() {
    this.router.navigateByUrl('shopping-cart').then(r => console.log('my cart'));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

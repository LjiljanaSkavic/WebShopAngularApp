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

  constructor(private categoryService: CategoryService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
        console.log(categories)
        this.categories = categories;
      }
    )
  }


  onProfileClick() {
    this.userService.isLoggedIn ? this.router.navigateByUrl('my-profile').then(r => console.log('my profile')) : this.router.navigateByUrl('login').then(r => console.log('login'));
  }
}

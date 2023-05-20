import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../services/category.service";
import { Category } from "../models/Category";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm = "";
  showFiller = false;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
        console.log(categories)
        this.categories = categories;
      }
    )
  }


}

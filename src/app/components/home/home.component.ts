import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/Category";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }

}

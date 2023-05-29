import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Category } from "../../models/Category";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { debounceTime, Subscription } from "rxjs";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { FormControl, FormGroup } from "@angular/forms";

interface ExampleFlatNode {
  id: number,
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  newCategorySelected = new EventEmitter<number>();
  newQueryWritten = new EventEmitter<string>();
  subs = new Subscription();
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  dataSource: MatTreeFlatDataSource<Category, ExampleFlatNode, ExampleFlatNode>;
  searchControl = new FormControl('');
  searchBarGroup = new FormGroup({
    searchControl: this.searchControl,
  });


  constructor(private categoryService: CategoryService, private router: Router, private userService: UserService) {
  }

  _transformer = (node: Category, level: number) => {
    return {
      id: node.id,
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.subs.add(this.categoryService.getAll().subscribe(categories => {
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = categories;
    }));
    this.subs.add(this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(query => {
      console.log(query);
      if (query != null) {
        this.newQueryWritten.emit(query);
      }
    }));
  }


  onProfileClick() {
    this.userService.isLoggedIn ? this.router.navigateByUrl('profile-page').then(r => console.log('profile-page')) : this.router.navigateByUrl('login').then(r => console.log('login'));
  }

  onShoppingCartClick() {
    this.router.navigateByUrl('shopping-cart').then(r => console.log('my cart'));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getNode(node: Category) {
    this.newCategorySelected.emit(node.id);
  }

  showAllButtonClicked() {
    this.newCategorySelected.emit(0);
  }
}

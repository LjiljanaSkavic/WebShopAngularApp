import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { Category } from "./models/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoryService } from "./services/category.service";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { SharedService } from "./services/shared.service";

interface ExampleFlatNode {
  id: number,
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WebShopAngularApp';

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

  constructor(private sharedService: SharedService, private categoryService: CategoryService, private router: Router, private userService: UserService) {
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
    if (this.userService.isLoggedIn) {

    }
    this.subs.add(this.categoryService.getAll().subscribe(categories => {
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = categories;
    }));
    this.subs.add(this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(query => {
      console.log(query);
      if (query != null) {
        this.sharedService.newQueryWritten.emit(query);
      }
    }));
  }


  onProfileClick() {
    this.userService.isLoggedIn ? this.router.navigateByUrl('profile-page').catch(err => console.log(err)) : this.router.navigateByUrl('login').catch(err => console.log(err));
  }

  onShoppingCartClick() {
    this.router.navigateByUrl('shopping-cart').catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getNode(node: Category) {
    this.sharedService.newCategorySelected.next(node.id);
  }

  showAllButtonClicked() {
    this.sharedService.newCategorySelected.next(0);
  }
}

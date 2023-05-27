import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Category } from "../../models/Category";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";

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
  subs = new Subscription();
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  dataSource: MatTreeFlatDataSource<Category, ExampleFlatNode, ExampleFlatNode>;

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
      }
    ));
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

  getNode(node: Category) {
    this.newCategorySelected.emit(node.id);
  }

  showAllButtonClicked() {
    this.newCategorySelected.emit(0);
  }
}

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
import { LocalService } from "./services/local.service";

interface ExampleFlatNode {
  id: number,
  expandable: boolean;
  name: string;
  level: number;
}

export const SEARCH_DEBOUNCE_TIME = 500;


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

  constructor(private localStore: LocalService,
              private sharedService: SharedService,
              private categoryService: CategoryService,
              private router: Router,
              private userService: UserService) {
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

    this.subs.add(this.searchControl.valueChanges.pipe(debounceTime(SEARCH_DEBOUNCE_TIME)).subscribe(query => {
      if (query != null) {
        this.sharedService.newQueryWritten.emit(query);
      }
    }));
  }


  onProfileClick() {
    const userId = this.localStore.getData('userId');
    return userId !== null ? this.router.navigate(['profile-page'], {queryParams: {id: userId}}).catch(err => console.log(err)) : this.router.navigateByUrl('login').catch(err => console.log(err));
  }

  onShoppingCartClick() {
    this.router.navigateByUrl('shopping-cart').catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getNode(node: Category) {
    this.router.navigateByUrl('web-shop').then(res => {
      this.sharedService.newCategorySelected.next(node.id);
    });
  }

  showAllButtonClicked() {
    this.router.navigateByUrl('web-shop').then(res => {
      this.sharedService.newCategorySelected.next(0);
    });
  }

  onWebShopClick() {
    this.router.navigateByUrl('web-shop').catch(err => console.log(err));
  }
}

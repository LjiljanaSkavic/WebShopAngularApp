import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Observable, Subscription, switchMap } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { Category } from "./models/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoryService } from "./services/category.service";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { SharedService } from "./services/shared.service";
import { LocalService } from "./services/local.service";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";
import { DEFAULT_ANIMATION_DURATION } from "./components/product-details/product-details.component"
import { MatDialog } from "@angular/material/dialog";
import { ContactSupportModalComponent } from "./components/contact-support-modal/contact-support-modal.component";
import { ContactSupportService } from "./services/contact-support.service";
import { Message } from "./models/Message";
import { User } from "./models/User";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WebShopAngularApp';
  collapsed = true;

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
              private userService: UserService,
              private contactSupport: ContactSupportService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
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


  onProfileDetailsClick() {
    const user = this.userService.getLoggedUser();
    if (user != null) {
      const loggedUser = JSON.parse(user);
      this.router.navigate(['profile-page'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
    this.collapsed = true;
  }

  onPurchaseHistoryClick() {
    this.router.navigateByUrl('purchase-history').catch(err => console.log(err));
  }

  toggleAccountMenu() {
    const user = this.userService.getLoggedUser();
    user === null ? this.router.navigateByUrl('login').catch(err => console.log(err)) : this.collapsed = !this.collapsed;
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
    this.showAllButtonClicked();
  }

  onLogOutClick() {
    this.userService.setUserAsLoggedOut();
    this.router.navigateByUrl('web-shop').catch(err => console.log(err));
    this.collapsed = true;
  }

  onChangePasswordClick() {
    const user = this.userService.getLoggedUser();
    if (user != null) {
      const loggedUser = JSON.parse(user);
      this.router.navigate(['manage-password'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
    this.collapsed = true;
  }

  onStoreClick() {
    const user = this.userService.getLoggedUser();
    if (user != null) {
      const loggedUser = JSON.parse(user);
      this.router.navigate(['store'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
  }

  onContactSupportClick() {
    this.dialog.open(ContactSupportModalComponent,
    ).afterClosed().pipe(switchMap(message => {
        if (message != null) {
          //TODO refactor this
          const userString = this.userService.getLoggedUser();
          if (userString != null) {
            const user: User = JSON.parse(userString);

            const contactSupportMessage: Message = {
              text: message,
              isRead: false,
              senderUserId: user.id,
            }
            return this.contactSupport.createMessage(contactSupportMessage)
          } else {
            return new Observable<null>()
          }
        } else return new Observable<null>();
      }
    )).subscribe((result) => {
        //TODO: add notification
        this._snackBar.open("Message successfully sent.", "OK", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
      (err) => {
        this._snackBar.open("An error has occurred.", "Try again", {
          duration: 3000,
        })
      });
  }
}

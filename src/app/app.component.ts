import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Observable, Subscription, switchMap } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { Category } from "./models/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoryService } from "./services/category.service";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { SharedService } from "./services/shared.service";
import { animate, AUTO_STYLE, state, style, transition, trigger } from "@angular/animations";
import { DEFAULT_ANIMATION_DURATION } from "./components/product-details/product-details.component"
import { MatDialog } from "@angular/material/dialog";
import { ContactSupportModalComponent } from "./components/contact-support-modal/contact-support-modal.component";
import { ContactSupportService } from "./services/contact-support.service";
import { Message } from "./models/Message";
import { User } from "./models/User";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "./components/product-purchase-card/product-purchase-card.component";
import { DIALOG_RESPONSE } from "./components/confirmation-modal/confirmation-modal.component";
import { ERROR_HAS_OCCURRED_MESSAGE, MESSAGE_SUCCESS } from "./shared/constants";

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
  isLoggedIn = false;

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

  constructor(
    private _sharedService: SharedService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _userService: UserService,
    private _contactSupport: ContactSupportService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _elRef: ElementRef) {
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
    this.isLoggedIn = this._userService.isLoggedIn;

    this.subs.add(this._categoryService.getAll().subscribe(categories => {
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = categories;
    }));

    this.subs.add(this.searchControl.valueChanges.pipe(debounceTime(SEARCH_DEBOUNCE_TIME)).subscribe(query => {
      if (query !== null) {
        this._sharedService.newQueryWritten.emit(query);
      }
    }));

    this._userService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
      if (this._userService.getLoggedUser() !== null) {
        this.isLoggedIn = true;
      }
    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedToggleProfile = this._elRef.nativeElement.querySelector('.profile-details').contains(event.target);
    const clickedInsideProfileCard = this._elRef.nativeElement.querySelector('.quick-profile-view-card').contains(event.target);

    if (!clickedToggleProfile && !clickedInsideProfileCard && !this.collapsed) {
      this.collapsed = true;
    }
  }


  onProfileDetailsClick() {
    const user = this._userService.getLoggedUser();
    if (user !== null) {
      const loggedUser = JSON.parse(user);
      this._router.navigate(['profile-page'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
    this.collapsed = true;
  }

  onPurchaseHistoryClick() {
    this._router.navigateByUrl('purchase-history').catch(err => console.log(err));
  }

  toggleAccountMenu() {
    const user = this._userService.getLoggedUser();
    user === null ? this._router.navigateByUrl('login').catch(err => console.log(err)) : this.collapsed = !this.collapsed;
  }

  getNode(node: Category) {
    this._router.navigateByUrl('web-shop').then(res => {
      this._sharedService.newCategorySelected.next(node.id);
    });
  }

  showAllButtonClicked() {
    this._router.navigateByUrl('web-shop').then(res => {
      this._sharedService.newCategorySelected.next(0);
    });
  }

  onWebShopClick() {
    this.showAllButtonClicked();
  }

  onLogOutClick() {
    const user = this._userService.getLoggedUser();
    if (user !== null) {
      const loggedUser = JSON.parse(user);
      this._userService.logoutUser(loggedUser.id).subscribe(res => {
        this.collapsed = true;
        this._userService.setUserAsLoggedOut();
        this._router.navigateByUrl('login').catch(err => console.log(err));
        console.log('odjavljeni user', user);
        this._userService.isLoggedIn$.next(false);
        this._router.navigateByUrl('web-shop').catch(err => console.log(err));
      }, err => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      });
    } else {
      this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
    }
  }

  onChangePasswordClick() {
    const user = this._userService.getLoggedUser();
    if (user !== null) {
      const loggedUser = JSON.parse(user);
      this._router.navigate(['manage-password'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
    this.collapsed = true;
  }

  onStoreClick() {
    const user = this._userService.getLoggedUser();
    if (user !== null) {
      const loggedUser = JSON.parse(user);
      this._router.navigate(['store'], {queryParams: {id: loggedUser.id}}).catch(err => console.log(err));
    }
  }

  onContactSupportClick() {
    this.dialog.open(ContactSupportModalComponent,
    ).afterClosed().pipe(switchMap(message => {
        const userString = this._userService.getLoggedUser();
        if (!!message && message !== DIALOG_RESPONSE.DISCARD && userString !== null) {
          const user: User = JSON.parse(userString);

          const contactSupportMessage: Message = {
            text: message,
            isRead: false,
            senderUserId: user.id,
          }

          return this._contactSupport.createMessage(contactSupportMessage)
        }
        return new Observable<null>();
      }
    )).subscribe((result) => {
        this._snackBar.open(MESSAGE_SUCCESS, "OK", snackBarConfig)
      },
      (err) => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig)
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

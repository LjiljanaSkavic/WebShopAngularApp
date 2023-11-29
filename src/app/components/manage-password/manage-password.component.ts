import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription, switchMap } from "rxjs";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ManagePasswordModalComponent } from "../manage-password-modal/manage-password-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { snackBarConfig } from "../product-purchase-card/product-purchase-card.component";
import { ERROR_HAS_OCCURRED_MESSAGE } from "../../shared/constants";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  user: User;

  constructor(private _userService: UserService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const loggedUserString = this._userService.getLoggedUser();
    if (loggedUserString !== null) {
      this.user = JSON.parse(loggedUserString);
    }
  }

  resetPasswordSelected() {
    this.dialog.open(ManagePasswordModalComponent,
    ).afterClosed().pipe(switchMap(newPasswordHash => {
      if (newPasswordHash != null) {
        return this._userService.changePassword(this.user, newPasswordHash);
      } else {
        return EMPTY;
      }
    })).subscribe(res => {
      this._snackBar.open("Password successfully changed", "OK", snackBarConfig);
      //TODO: Set user with this password to local storage
    }, (err) => {
      this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig)
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


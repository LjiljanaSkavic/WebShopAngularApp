import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";
import { UserService } from "../../services/user.service";
import { LocalService } from "../../services/local.service";
import { User } from "../../models/User";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  subs = new Subscription();
  formChanged = false;
  user: User;


  constructor(private _router: Router,
              private _sharedService: SharedService,
              private _userService: UserService,
              private _localStore: LocalService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.buildEmptyForm();
    const userString = this._localStore.getData('loggedUser');
    if (userString !== null) {
      this.subs.add(this._userService.getUser(JSON.parse(userString).id).pipe(switchMap(user => {
        this.buildProfileForm(user);
        this.user = user;
        return this.profileForm.valueChanges;
      })).subscribe(formChanged => {
        this.formChanged = true;
      }));
    }


    //   this._router.events.pipe(
    //     filter(event => event instanceof NavigationEnd)).pipe(switchMap(res => {
    //     console.log('ejj');
    //     if (this.formChanged) {
    //       console.log('form changed');
    //       return this.dialog.open(ConfirmationModalComponent, {
    //         data: {
    //           title: "Leave change password",
    //           text: "Are you sure that you want to leave this page and discard changes?"
    //         }
    //       }).afterClosed()
    //     } else {
    //       return new Observable<null>()
    //     }
    //   })).subscribe(res => {
    //     if (res === DIALOG_RESPONSE.NO) {
    //       console.log('stay on the page');
    //     }
    //   });
  }

  buildEmptyForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null),
      email: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      postalCode: new FormControl(null),
      streetAddress: new FormControl(null),
      streetNumber: new FormControl(null),
    });
  }

  buildProfileForm(user: User) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      username: new FormControl({value: user.username, disabled: true}),
      email: new FormControl(user.email),
      country: new FormControl(user.location?.country.name),
      city: new FormControl(user.location?.city),
      postalCode: new FormControl(user.location?.postalCode),
      streetAddress: new FormControl(user.location?.streetAddress),
      streetNumber: new FormControl(user.location?.streetNumber),
    });
  }

  onDiscardProfileChanges() {
    this.buildProfileForm(this.user);
    this.formChanged = false;
  }

  onSaveProfileChanges() {
    //TODO: Implement post on profile
    this.formChanged = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

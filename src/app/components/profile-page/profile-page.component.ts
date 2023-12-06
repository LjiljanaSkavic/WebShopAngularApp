import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
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
  user: User;
  isEditMode = false;


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
      this.subs.add(this._userService.getUser(JSON.parse(userString).id).subscribe(user => {
        this.buildProfileForm(user);
        this.profileForm.disable();
        this.user = user;
        return
      }));
    }

    this.profileForm.valueChanges.subscribe(res => {
      //TODO: Implement logic
    })
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
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      username: new FormControl({value: user.username, disabled: true}),
      email: new FormControl(user.email, Validators.required),
      country: new FormControl(user.location?.country.name),
      city: new FormControl(user.location?.city),
      postalCode: new FormControl(user.location?.postalCode),
      streetAddress: new FormControl(user.location?.streetAddress),
      streetNumber: new FormControl(user.location?.streetNumber),
    });
  }

  onDiscardProfileChanges() {
    this.buildProfileForm(this.user);
    this.isEditMode = false;
    this.profileForm.disable();
  }

  onSaveProfileChanges() {
    //TODO: Implement post on profile
    this.isEditMode = false;
    const modifiedUser: User = {
      activationPin: this.user.activationPin,
      email: this.profileForm.get('email')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      id: this.user.id,
      imageAvatar: "",
      isActivated: this.user.isActivated,
      isLoggedIn: this.user.isLoggedIn,
      lastName: this.profileForm.get('lastName')?.value,
      location: {
        id: this.user.location.id,
        streetAddress: this.profileForm.get('streetAddress')?.value,
        streetNumber: this.profileForm.get('streetNumber')?.value,
        postalCode: this.profileForm.get('postalCode')?.value,
        city: this.profileForm.get('city')?.value,
        country: {
          id: this.user.location.country.id,
          name: this.profileForm.get('country')?.value
        },

      },
      password: this.user.password,
      username: this.user.username
    };
    this._userService.updateUser(this.user.id, modifiedUser).subscribe(res => {
      // this.user = res;
      //TODO: Add success message or error
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onEditProfilePageClick(): void {
    this.isEditMode = true;
    this.profileForm.enable();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";
import { UserService } from "../../services/user.service";
import { LocalService } from "../../services/local.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  resetPasswordForm: FormGroup;
  subs = new Subscription();
  resetPasswordClicked = false;
  formChanged = false;


  constructor(private router: Router,
              private sharedService: SharedService,
              private userService: UserService,
              private localStore: LocalService) {
  }

  ngOnInit(): void {
    this.buildEmptyForm();
    const userString = this.localStore.getData('loggedUser');
    if (userString != null) {
      this.subs.add(this.userService.getUser(JSON.parse(userString).id).pipe(switchMap(user => {
        this.buildProfileForm(user);
        return this.profileForm.valueChanges;
      })).subscribe(formChanged => {
        this.formChanged = true;
      }));
    }
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
      username: new FormControl(user.username),
      email: new FormControl(user.email),
      country: new FormControl(user.location.country.name),
      city: new FormControl(user.location.city),
      postalCode: new FormControl(user.location.postalCode),
      streetAddress: new FormControl(user.location.streetAddress),
      streetNumber: new FormControl(user.location.streetNumber),
    });
  }

  onDiscardProfileChanges() {

  }

  onSaveProfileChanges() {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { SharedService } from "../../services/shared.service";
import { User } from "../../models/User";

export const PASSWORD_ERROR_MESSAGES = {
  PASSWORDS_DONT_MATCH: "Passwords don't match.",
  INVALID_OLD_PASSWORD: "Old password doesn't match."
}

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  subs = new Subscription();
  resetPasswordClicked = false;
  oldPassword: string;
  oldPasswordInputHash = "";
  user: User;
  protected readonly PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES;

  constructor(private _userService: UserService,
              private _sharedService: SharedService) {
  }

  get formDirty() {
    return this.resetPasswordForm.dirty;
  }

  ngOnInit(): void {
    const userString = this._userService.getLoggedUser();
    if (userString != null) {
      const user = JSON.parse(userString);
      this.oldPassword = user.password;
      console.log('old password', this.oldPassword);
      this.user = user;
      console.log(user);
    }
    this.buildEmptyForm();

    this.subs.add(this.resetPasswordForm.get('oldPassword')?.valueChanges.subscribe(input => {
      this.oldPasswordInputHash = this._sharedService.getSha512Hash(input);
      console.log(this.oldPasswordInputHash);
    }));
  }

  resetPasswordSelected() {
    this.resetPasswordClicked = !this.resetPasswordClicked;
  }

  onSubmitPasswordClick() {
    this.resetPasswordClicked = false;
    const newPasswordValue = this.resetPasswordForm.get('newPassword')?.value
    const newPasswordHash = this._sharedService.getSha512Hash(newPasswordValue);
    this._userService.changePassword(this.user, newPasswordHash).subscribe(res => {
      //TODO add success message
      console.log('response', res);
    });
  }

  hasOldPasswordError(): boolean {
    console.log('old', this.oldPasswordInputHash);
    console.log('new', this.oldPassword);
    console.log(this.resetPasswordForm.get('oldPassword')?.dirty);
    return this.resetPasswordForm.get('oldPassword')?.dirty ?
      this.oldPasswordInputHash !== this.oldPassword : false;
  }

  hasPasswordsMatchError(): boolean {
    return this.resetPasswordForm.get('newPassword')?.dirty && this.resetPasswordForm.get('repeatNewPassword')?.dirty ?
      this.resetPasswordForm.get('newPassword')?.value !== this.resetPasswordForm.get('repeatNewPassword')?.value : false;
  }

  onDiscardPasswordClick() {
    this.resetPasswordClicked = false;
    this.buildEmptyForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buildEmptyForm() {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      repeatNewPassword: new FormControl(null, [Validators.required])
    });
  }
}


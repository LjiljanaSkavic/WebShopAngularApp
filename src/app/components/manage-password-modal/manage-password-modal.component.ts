import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {SharedService} from "../../services/shared.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";

export const PASSWORD_ERROR_MESSAGES = {
  PASSWORDS_DONT_MATCH: "Passwords don't match.",
  INVALID_OLD_PASSWORD: "Old password doesn't match."
}

@Component({
  selector: 'app-manage-password-modal',
  templateUrl: './manage-password-modal.component.html',
  styleUrls: ['./manage-password-modal.component.scss']
})
export class ManagePasswordModalComponent implements OnInit, OnDestroy {

  PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES;
  resetPasswordForm: FormGroup;
  subs = new Subscription();
  oldPassword: string;
  oldPasswordInputHash = "";
  user: User;

  constructor(private _sharedService: SharedService,
              private _userService: UserService,
              public dialogRef: MatDialogRef<ManagePasswordModalComponent>) {
  }

  ngOnInit(): void {
    const userString = this._userService.getLoggedUser();
    if (userString !== null) {
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

  buildEmptyForm() {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      repeatNewPassword: new FormControl(null, [Validators.required])
    });
  }

  onSubmitPasswordClick() {
    const newPasswordValue = this.resetPasswordForm.get('newPassword')?.value
    const newPasswordHash = this._sharedService.getSha512Hash(newPasswordValue);
    this.dialogRef.close(newPasswordHash);
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
    this.dialogRef.close(null);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}

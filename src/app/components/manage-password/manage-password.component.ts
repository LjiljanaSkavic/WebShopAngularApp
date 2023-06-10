import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { SharedService } from "../../services/shared.service";

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
  protected readonly Validators = Validators;

  constructor(private userService: UserService,
              private sharedService: SharedService) {
  }

  get formDirty() {
    return this.resetPasswordForm.dirty;
  }

  ngOnInit(): void {
    const userString = this.userService.getLoggedUser();
    if (userString != null) {
      const user = JSON.parse(userString);
      this.oldPassword = user.password;
      console.log(this.oldPassword);
    }
  }

  resetPasswordSelected() {
    this.resetPasswordClicked = !this.resetPasswordClicked;
    if (this.resetPasswordClicked) {
      this.resetPasswordForm = new FormGroup({
        oldPassword: new FormControl(null, [Validators.required]),
        newPassword: new FormControl(null, [Validators.required]),
        repeatNewPassword: new FormControl(null, [Validators.required])
      });
    }
  }

  onSubmitPasswordClick() {
    this.resetPasswordClicked = false;
  }

  onDiscardPasswordClick() {
    this.resetPasswordClicked = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


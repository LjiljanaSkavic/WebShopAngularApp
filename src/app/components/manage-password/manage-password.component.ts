import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  subs = new Subscription();
  resetPasswordClicked = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  resetPasswordSelected() {
    this.resetPasswordClicked = !this.resetPasswordClicked;
    if (this.resetPasswordClicked) {
      this.resetPasswordForm = new FormGroup({
        oldPassword: new FormControl(null),
        password: new FormControl(null),
        repeatPassword: new FormControl(null)
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

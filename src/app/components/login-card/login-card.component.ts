import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { SharedService } from "../../services/shared.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";
import { Subscription } from "rxjs";
import { LocalService } from "../../services/local.service";

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit, OnDestroy {
  hidePassword = true;
  loginForm: UntypedFormGroup;
  invalidCredentials = false;
  subs = new Subscription();

  constructor(private localStore: LocalService, private readonly _formBuilder: UntypedFormBuilder, private sharedService: SharedService, private router: Router, private loginService: LoginService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    //TODO: Write this in better way
    this.subs.add(this.loginForm.get('username')?.valueChanges.subscribe(value => this.invalidCredentials = false));
    this.subs.add(this.loginForm.get('password')?.valueChanges.subscribe(value => this.invalidCredentials = false));
  }


  onSignUpClick($event: MouseEvent) {
    this.router.navigateByUrl('sign-up').catch(err => console.log(err));
  }

  onLoginClick($event: MouseEvent) {
    const username = this.loginForm.get('username')?.value;
    const password = this.getPasswordHash();
    this.subs.add(this.loginService.getUserByUsernameAndPassword(username, password).subscribe(user => {
      if (user.isActivated) {
        this.router.navigateByUrl('/web-shop').catch(err => console.log(err));
        this.userService.isLoggedIn = true;
        this.userService.userId = user.id;
        this.localStore.saveData('userId', user.id.toString());
        this.userService.isActivated = true;
      } else {
        this.router.navigate(['profile-activation']).catch(err => console.log(err));
      }
      this.invalidCredentials = false;
    }, err => {
      this.invalidCredentials = true;
    }));
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required])
    });
  }

  getPasswordHash(): string {
    return this.sharedService.getSha512Hash(this.loginForm.get('password')?.value);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

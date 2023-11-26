import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { SharedService } from "../../services/shared.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";
import {EMPTY, Observable, Subscription, switchMap, throwError} from "rxjs";
import { LocalService } from "../../services/local.service";
import { RegisterService } from "../../services/register.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "../product-purchase-card/product-purchase-card.component";

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit, OnDestroy {
  hidePassword = true;
  loginForm: FormGroup;
  invalidCredentials = false;
  subs = new Subscription();

  constructor(private _localStore: LocalService,
              private readonly _formBuilder: UntypedFormBuilder,
              private _sharedService: SharedService,
              private _router: Router,
              private _loginService: LoginService,
              private _userService: UserService,
              private _registerService: RegisterService,
              private _snackBar: MatSnackBar) {
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
    this._router.navigateByUrl('sign-up').catch(err => console.log(err));
  }

  onLoginClick($event: MouseEvent) {
    console.log('on login click')
    const username = this.loginForm.get('username')?.value;
    const password = this.getPasswordHash();
    this._loginService.findUserByUsernameAndPassword(username, password)
      .pipe(switchMap(user => {
      console.log('user', user);
      if (user.isActivated) {
        console.log('korisnik je vec aktiviran', user);
        this._router.navigateByUrl('web-shop').catch(err => console.log(err));
        this._userService.setUserAsLoggedIn(user);
        console.log(user.id);
        return this._userService.loginUser(user.id);
      } else {
        console.log('korisnik nije aktiviran', user);
        this._registerService.username = username;
        this._registerService.password = password;
        this._registerService.activationPin = user.activationPin;
        this._router.navigate(['profile-activation'], {queryParams: {id: user.id}}).catch(err => console.log(err));
        return EMPTY;
      }
    })).subscribe(user => {
      console.log('yo');
      this._userService.isLoggedIn$.next(true);
      this._snackBar.open("Successfully logged in, enjoy buying products", "OK", snackBarConfig);
      }, err => {
      console.log('invalid credentials');
      this.invalidCredentials = true;
    });
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  getPasswordHash(): string {
    return this._sharedService.getSha512Hash(this.loginForm.get('password')?.value);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

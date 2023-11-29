import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, switchMap } from "rxjs";
import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit, OnDestroy {
  activationProfileForm: UntypedFormGroup;
  activationPin: number;
  email: string;
  userId: number;
  username: string;
  password: string;
  subs = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _registerService: RegisterService,
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService) {
  }

  ngOnInit(): void {
    this.subs.add(this._activatedRoute.queryParams.subscribe(params => {
        this.userId = params['id'];
      }
    ));

    this.activationPin = this._registerService.activationPin;
    console.log(this.activationPin);
    this.email = this._registerService.email;
    this.username = this._registerService.username;
    this.password = this._registerService.password;
    this.activationProfileForm = new FormGroup({
      activationPinControl: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])
    });
  }

  onSubmitActivationCodeClick() {
    const activationPinControlValue = this.activationProfileForm.get('activationPinControl')?.value;
    if (+activationPinControlValue === this.activationPin) {
      this.subs.add(
        this._loginService.activateUser(this.userId).pipe(switchMap(res => {
            //TODO: Avoid using this endpoint only because of user data
            console.log('on submit')
            return this._loginService.findUserByUsernameAndPassword(this.username, this.password);
          }
        )).subscribe(user => {
          this._router.navigateByUrl('web-shop').catch(err => console.log(err));
          this._userService.setUserAsLoggedIn(user);
          this._userService.isLoggedIn$.next(true);
        }))
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

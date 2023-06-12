import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { RegisterService } from "../../services/register.service";
import { NewUser } from "../../models/User";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.scss']
})
export class SignUpCardComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  subs = new Subscription();

  constructor(private _router: Router,
              private _registerService: RegisterService,
              private _sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
    });
  }

  onLogInClick($event: MouseEvent) {
    this._router.navigateByUrl('login').catch(err => console.log(err));
  }

  onSignUpClick($event: MouseEvent) {
    if (this.signUpForm.valid) {
      const user: NewUser = {
        email: this.signUpForm.get('email')?.value,
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        password: this._sharedService.getSha512Hash(this.signUpForm.get('password')?.value),
        username: this.signUpForm.get('username')?.value
      }
      this.subs.add(this._registerService.createUser(user).subscribe(newUser => {
          this._registerService.activationPin = newUser.activationPin;
          this._registerService.email = newUser.email;
          this._router.navigate(['profile-activation'], {queryParams: {id: newUser.id}}).catch(err => console.log(err));
        },
        err => {
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

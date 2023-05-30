import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";
import { Subscription } from "rxjs";

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
  subs = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private registerService: RegisterService, private router: Router, private userService: UserService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParams
      .subscribe(params => {
        this.userId = params['id'];
      }));

    this.activationPin = this.registerService.activationPin;
    this.email = this.registerService.email;
    console.log(this.registerService.email);
    this.activationProfileForm = new FormGroup({
      activationPinControl: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])
    });
  }

  onSubmitActivationCodeClick() {
    const activationPinControlValue = this.activationProfileForm.get('activationPinControl')?.value;
    if (+activationPinControlValue === this.activationPin) {
      console.log('if pin si valid if ', this.userId);
      this.subs.add(this.registerService.activateProfile(this.userId).subscribe(res => {
        this.router.navigateByUrl('web-shop').then(r => console.log('logged in'));
        this.userService.isLoggedIn = true;
        console.log('successful login');
      }))
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

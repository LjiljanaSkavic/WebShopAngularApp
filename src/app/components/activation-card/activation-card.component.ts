import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LocalService } from "../../services/local.service";

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

  constructor(private _localStore: LocalService,
              private _activatedRoute: ActivatedRoute,
              private _registerService: RegisterService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.subs.add(this._activatedRoute.queryParams
      .subscribe(params => {
        this.userId = params['id'];
      }));

    this.activationPin = this._registerService.activationPin;
    this.email = this._registerService.email;
    this.activationProfileForm = new FormGroup({
      activationPinControl: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])
    });
  }

  onSubmitActivationCodeClick() {
    const activationPinControlValue = this.activationProfileForm.get('activationPinControl')?.value;
    if (+activationPinControlValue === this.activationPin) {
      this.subs.add(this._registerService.activateProfile(this.userId).subscribe(res => {
        this._router.navigateByUrl('web-shop').catch(err => console.log(err));
        //todo ovdje staviti user-a u local storage
      }))
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

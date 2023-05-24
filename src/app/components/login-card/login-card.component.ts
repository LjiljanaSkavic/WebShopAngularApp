import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  hidePassword = true;
  loginForm: UntypedFormGroup;

  constructor(private readonly _formBuilder: UntypedFormBuilder, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    })
  }


  onSignUpClick($event: MouseEvent) {
    this.router.navigateByUrl('sign-up').then(r => console.log('sign-up'));
  }

  onLoginClick($event: MouseEvent) {
    const username = this.loginForm.get('username')?.value;
    const password = this.getPasswordHash();
    console.log(username, password);
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
}

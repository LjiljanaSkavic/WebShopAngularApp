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

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  hidePassword = true;
  loginForm: UntypedFormGroup;

  constructor(private readonly _formBuilder: UntypedFormBuilder, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }


  onSignUpClick($event: MouseEvent) {

  }

  onLoginClick($event: MouseEvent) {
    //TODO: post sa username and password
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  getPasswordHash(): string {
    return this.sharedService.getSha512Hash(this.loginForm.get('password')?.value);
  }
}

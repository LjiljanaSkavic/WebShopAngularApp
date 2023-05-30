import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn;
  }

  onSignInYourAccountClick() {
    this.router.navigateByUrl('login').catch(err => console.log(err));
  }

  onSignUpNowClick() {
    this.router.navigateByUrl('sign-up').catch(err => console.log(err));
  }
}

import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.scss']
})
export class SignUpCardComponent {

  constructor(private router: Router) {
  }

  onLogIn($event: MouseEvent) {
    this.router.navigateByUrl('login').then(r => console.log('login'));
  }

  onSignUp($event: MouseEvent) {
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {
  hidePassword = true;

  constructor() {
  }

  ngOnInit(): void {
  }


  onSignUp($event: MouseEvent) {
    
  }
}

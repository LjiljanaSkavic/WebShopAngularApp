import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit {
  activationCode = new FormControl(null);
  @Input() email: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmitActivationCodeClick() {

  }
}

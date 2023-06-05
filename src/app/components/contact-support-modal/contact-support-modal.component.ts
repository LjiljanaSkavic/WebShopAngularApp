import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-contact-support-modal',
  templateUrl: './contact-support-modal.component.html',
  styleUrls: ['./contact-support-modal.component.scss']
})
export class ContactSupportModalComponent {
  subs = new Subscription();

  messageControl = new FormControl('');
  contactSupportFrom = new FormGroup({
    messageControl: this.messageControl,
  });
}

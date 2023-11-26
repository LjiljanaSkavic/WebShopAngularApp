import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {DIALOG_RESPONSE} from "../confirmation-modal/confirmation-modal.component";

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
  protected readonly DIALOG_RESPONSE = DIALOG_RESPONSE;
}

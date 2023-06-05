import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-contact-support-modal',
  templateUrl: './contact-support-modal.component.html',
  styleUrls: ['./contact-support-modal.component.scss']
})
export class ContactSupportModalComponent implements OnInit {
  contactSupportFrom: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.contactSupportFrom = new FormGroup({
      messageControl: new FormControl(null)
    });
  }

  onCloseContactSupport() {
  }
}

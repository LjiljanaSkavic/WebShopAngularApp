import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
  styleUrls: ['./buy-product-modal.component.scss']
})
export class BuyProductModalComponent implements OnInit, OnDestroy {
  codPaying = true;

  codPayingForm: FormGroup;
  creditCardPayingForm: FormGroup;
  selectPayingForm: FormGroup;
  subs = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
    this.selectPayingForm = new FormGroup(
      {
        payingOption: new FormControl('0')
      });

    this.codPayingForm = new FormGroup({
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required]),
      streetAddress: new FormControl(null, [Validators.required]),
      streetNumber: new FormControl(null, [Validators.required])
    });

    this.creditCardPayingForm = new FormGroup({
      creditCardNumber: new FormControl(null, [Validators.required]),
      firstAndLastName: new FormControl(null, [Validators.required]),
      cvvNumber: new FormControl(null, [Validators.required]),
      confirmProcessing: new FormControl(null, [Validators.required]),
    });

    this.selectPayingForm.get('payingOption')?.valueChanges.subscribe(selectedOption => {
      console.log(selectedOption);
      const option = parseInt(selectedOption);
      this.codPaying = option === 0;
    });
  }

  onDiscardBuyProductClick() {

  }

  onSubmitBuyProductClick() {
  }

  ngOnDestroy(): void {
  }

}

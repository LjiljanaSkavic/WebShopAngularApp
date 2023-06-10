import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedService } from "../../services/shared.service";
import { DIALOG_RESPONSE } from "../confirmation-modal/confirmation-modal.component";


@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
  styleUrls: ['./buy-product-modal.component.scss']
})
export class BuyProductModalComponent implements OnInit, OnDestroy {
  codPayingSelected = true;
  codPayingForm: FormGroup;
  creditCardPayingForm: FormGroup;
  selectPayingForm: FormGroup;
  subs = new Subscription();
  protected readonly MAT_DIALOG_DATA = MAT_DIALOG_DATA;
  protected readonly DIALOG_RESPONSE = DIALOG_RESPONSE;

  constructor(
    private productPurchaseService: ProductPurchaseService,
    private sharedService: SharedService) {
  }

  get selectedFormValid(): boolean {
    return this.codPayingSelected ? !this.codPayingForm.valid : !this.creditCardPayingForm.valid;
  }

  ngOnInit(): void {
    this.selectPayingForm = new FormGroup(
      {
        payingOption: new FormControl('0')
      });

    this.codPayingForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      streetAddress: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required])
    });

    this.creditCardPayingForm = new FormGroup({
      creditCardNumber: new FormControl('', [Validators.required]),
      firstAndLastName: new FormControl('', [Validators.required]),
      cvvNumber: new FormControl('', [Validators.required]),
      confirmProcessing: new FormControl(1, [Validators.required]),
    });

    this.subs.add(this.selectPayingForm.get('payingOption')?.valueChanges.subscribe(selectedOption => {
      const option = parseInt(selectedOption);
      this.codPayingSelected = option === 0;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ProductPurchaseService } from "../../services/product-purchase.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductPurchaseRequest } from "../../models/ProductPurchase";
import { SharedService } from "../../services/shared.service";

export interface DialogData {
  productId: number,
  userId: number
}

@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
  styleUrls: ['./buy-product-modal.component.scss']
})
export class BuyProductModalComponent implements OnInit, OnDestroy {
  codPayingSelected = true;
  dialogData: DialogData;
  codPayingForm: FormGroup;
  creditCardPayingForm: FormGroup;
  selectPayingForm: FormGroup;
  subs = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private productPurchaseService: ProductPurchaseService,
              private sharedService: SharedService) {
    this.dialogData = data;
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

  onDiscardBuyProductClick() {
  }

  onSubmitBuyProductClick() {
    const paymentType = this.selectPayingForm.get('payingOption')?.value;
    const productPurchaseRequest: ProductPurchaseRequest = {
      dateTime: new Date(),
      isDeleted: false,
      orderId: this.sharedService.getRandomEightCharactersLongString(),
      paymentType: parseInt(paymentType),
      productId: this.data.productId,
      userId: this.data.userId
    }
    console.log(productPurchaseRequest)
    this.subs.add(this.productPurchaseService.insertPurchase(productPurchaseRequest).subscribe(res => {
      console.log(res);
      console.log('uspjesno dodavanje')
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


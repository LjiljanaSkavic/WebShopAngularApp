import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductModalComponent } from './buy-product-modal.component';

describe('BuyProductModalComponent', () => {
  let component: BuyProductModalComponent;
  let fixture: ComponentFixture<BuyProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyProductModalComponent]
    });
    fixture = TestBed.createComponent(BuyProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

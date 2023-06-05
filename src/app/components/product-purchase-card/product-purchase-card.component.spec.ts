import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseCardComponent } from './product-purchase-card.component';

describe('ProductPurchaseContainerComponent', () => {
  let component: ProductPurchaseCardComponent;
  let fixture: ComponentFixture<ProductPurchaseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPurchaseCardComponent]
    });
    fixture = TestBed.createComponent(ProductPurchaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

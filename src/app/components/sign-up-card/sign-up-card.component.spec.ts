import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCardComponent } from './sign-up-card.component';

describe('SignUpCardComponent', () => {
  let component: SignUpCardComponent;
  let fixture: ComponentFixture<SignUpCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpCardComponent]
    });
    fixture = TestBed.createComponent(SignUpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

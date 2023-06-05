import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSupportModalComponent } from './contact-support-modal.component';

describe('ContactSupportModalComponent', () => {
  let component: ContactSupportModalComponent;
  let fixture: ComponentFixture<ContactSupportModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSupportModalComponent]
    });
    fixture = TestBed.createComponent(ContactSupportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

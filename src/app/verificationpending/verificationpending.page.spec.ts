import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationpendingPage } from './verificationpending.page';

describe('VerificationpendingPage', () => {
  let component: VerificationpendingPage;
  let fixture: ComponentFixture<VerificationpendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationpendingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationpendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

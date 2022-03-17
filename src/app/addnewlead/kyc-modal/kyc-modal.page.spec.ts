import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycModalPage } from './kyc-modal.page';

describe('KycModalPage', () => {
  let component: KycModalPage;
  let fixture: ComponentFixture<KycModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

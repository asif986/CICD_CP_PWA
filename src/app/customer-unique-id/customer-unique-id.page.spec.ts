import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUniqueIdPage } from './customer-unique-id.page';

describe('CustomerUniqueIdPage', () => {
  let component: CustomerUniqueIdPage;
  let fixture: ComponentFixture<CustomerUniqueIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUniqueIdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUniqueIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

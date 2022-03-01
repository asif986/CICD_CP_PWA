import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedBillPagePage } from './submitted-bill-page.page';

describe('SubmittedBillPagePage', () => {
  let component: SubmittedBillPagePage;
  let fixture: ComponentFixture<SubmittedBillPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedBillPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedBillPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

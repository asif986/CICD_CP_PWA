import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentiveBillsPage } from './incentive-bills.page';

describe('IncentiveBillsPage', () => {
  let component: IncentiveBillsPage;
  let fixture: ComponentFixture<IncentiveBillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentiveBillsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentiveBillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

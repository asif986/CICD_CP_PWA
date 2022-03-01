import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIncentiveRaiseBillPage } from './popup-incentive-raise-bill.page';

describe('PopupIncentiveRaiseBillPage', () => {
  let component: PopupIncentiveRaiseBillPage;
  let fixture: ComponentFixture<PopupIncentiveRaiseBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupIncentiveRaiseBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupIncentiveRaiseBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

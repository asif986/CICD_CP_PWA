import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRaiseBillPage } from './pop-up-raise-bill.page';

describe('PopUpRaiseBillPage', () => {
  let component: PopUpRaiseBillPage;
  let fixture: ComponentFixture<PopUpRaiseBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpRaiseBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpRaiseBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

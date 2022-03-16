import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveFOSRequestPage } from './approve-fosrequest.page';

describe('ApproveFOSRequestPage', () => {
  let component: ApproveFOSRequestPage;
  let fixture: ComponentFixture<ApproveFOSRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveFOSRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveFOSRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

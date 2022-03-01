import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreminderPage } from './addreminder.page';

describe('AddreminderPage', () => {
  let component: AddreminderPage;
  let fixture: ComponentFixture<AddreminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreminderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

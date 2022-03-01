import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupalertPage } from './popupalert.page';

describe('PopupalertPage', () => {
  let component: PopupalertPage;
  let fixture: ComponentFixture<PopupalertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupalertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupalertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

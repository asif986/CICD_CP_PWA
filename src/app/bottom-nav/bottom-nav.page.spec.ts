import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonNavPage } from './bottom-nav.page';

describe('BottonNavPage', () => {
  let component: BottonNavPage;
  let fixture: ComponentFixture<BottonNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottonNavPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

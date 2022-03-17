import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCPPage } from './select-cp.page';

describe('SelectCPPage', () => {
  let component: SelectCPPage;
  let fixture: ComponentFixture<SelectCPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewleadPage } from './addnewlead.page';

describe('AddnewleadPage', () => {
  let component: AddnewleadPage;
  let fixture: ComponentFixture<AddnewleadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewleadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewleadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

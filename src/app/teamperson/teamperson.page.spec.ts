import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeampersonPage } from './teamperson.page';

describe('TeampersonPage', () => {
  let component: TeampersonPage;
  let fixture: ComponentFixture<TeampersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeampersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeampersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

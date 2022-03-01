import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FOSListPage } from './foslist.page';

describe('FOSListPage', () => {
  let component: FOSListPage;
  let fixture: ComponentFixture<FOSListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FOSListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FOSListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

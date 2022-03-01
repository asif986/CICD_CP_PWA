import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFosListPage } from './add-fos-list.page';

describe('AddFosListPage', () => {
  let component: AddFosListPage;
  let fixture: ComponentFixture<AddFosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFosListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyperformancePage } from './myperformance.page';

describe('MyperformancePage', () => {
  let component: MyperformancePage;
  let fixture: ComponentFixture<MyperformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyperformancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyperformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

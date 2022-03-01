import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyperformancefilterPage } from './myperformancefilter.page';

describe('MyperformancefilterPage', () => {
  let component: MyperformancefilterPage;
  let fixture: ComponentFixture<MyperformancefilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyperformancefilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyperformancefilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

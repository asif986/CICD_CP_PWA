import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerformancePage } from './sales-performance.page';

describe('SalesPerformancePage', () => {
  let component: SalesPerformancePage;
  let fixture: ComponentFixture<SalesPerformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPerformancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPerformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

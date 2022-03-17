import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpstatusPage } from './cpstatus.page';

describe('CpstatusPage', () => {
  let component: CpstatusPage;
  let fixture: ComponentFixture<CpstatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpstatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpstatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

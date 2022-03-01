import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLogsPage } from './show-logs.page';

describe('ShowLogsPage', () => {
  let component: ShowLogsPage;
  let fixture: ComponentFixture<ShowLogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLogsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

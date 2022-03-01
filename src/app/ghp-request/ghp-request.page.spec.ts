import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhpRequestPage } from './ghp-request.page';

describe('GhpRequestPage', () => {
  let component: GhpRequestPage;
  let fixture: ComponentFixture<GhpRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhpRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhpRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

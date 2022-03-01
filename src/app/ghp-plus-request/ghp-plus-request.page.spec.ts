import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhpPlusRequestPage } from './ghp-plus-request.page';

describe('GhpPlusRequestPage', () => {
  let component: GhpPlusRequestPage;
  let fixture: ComponentFixture<GhpPlusRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhpPlusRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhpPlusRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

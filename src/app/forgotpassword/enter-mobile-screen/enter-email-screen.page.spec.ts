import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterEmailScreenPage } from './enter-email-screen.page';

describe('EnterEmailScreenPage', () => {
  let component: EnterEmailScreenPage;
  let fixture: ComponentFixture<EnterEmailScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterEmailScreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterEmailScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpawardsPage } from './cpawards.page';

describe('CpawardsPage', () => {
  let component: CpawardsPage;
  let fixture: ComponentFixture<CpawardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpawardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpawardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

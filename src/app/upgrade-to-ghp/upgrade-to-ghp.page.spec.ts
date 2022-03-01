import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeToGHPPage } from './upgrade-to-ghp.page';

describe('UpgradeToGHPPage', () => {
  let component: UpgradeToGHPPage;
  let fixture: ComponentFixture<UpgradeToGHPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeToGHPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeToGHPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

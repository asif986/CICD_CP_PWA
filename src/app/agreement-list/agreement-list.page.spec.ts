import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementListPage } from './agreement-list.page';

describe('AgreementListPage', () => {
  let component: AgreementListPage;
  let fixture: ComponentFixture<AgreementListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

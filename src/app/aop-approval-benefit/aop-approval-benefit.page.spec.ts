import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AopApprovalBenefitPage } from './aop-approval-benefit.page';

describe('AopApprovalBenefitPage', () => {
  let component: AopApprovalBenefitPage;
  let fixture: ComponentFixture<AopApprovalBenefitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AopApprovalBenefitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AopApprovalBenefitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

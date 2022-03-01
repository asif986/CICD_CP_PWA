import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadStatPage } from './team-lead-stat.page';

describe('TeamLeadStatPage', () => {
  let component: TeamLeadStatPage;
  let fixture: ComponentFixture<TeamLeadStatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeadStatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeadStatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

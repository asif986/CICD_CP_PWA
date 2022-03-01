import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamPersonPage } from './add-team-person.page';

describe('AddTeamPersonPage', () => {
  let component: AddTeamPersonPage;
  let fixture: ComponentFixture<AddTeamPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamPersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIsTeamFosPage } from './update-is-team-fos.page';

describe('UpdateIsTeamFosPage', () => {
  let component: UpdateIsTeamFosPage;
  let fixture: ComponentFixture<UpdateIsTeamFosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIsTeamFosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIsTeamFosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

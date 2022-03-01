import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbrochuresPage } from './projectbrochures.page';

describe('ProjectbrochuresPage', () => {
  let component: ProjectbrochuresPage;
  let fixture: ComponentFixture<ProjectbrochuresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectbrochuresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbrochuresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

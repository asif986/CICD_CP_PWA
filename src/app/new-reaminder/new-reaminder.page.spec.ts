import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReaminderPage } from './new-reaminder.page';

describe('NewReaminderPage', () => {
  let component: NewReaminderPage;
  let fixture: ComponentFixture<NewReaminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReaminderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReaminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

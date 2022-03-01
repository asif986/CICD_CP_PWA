import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGHPPage } from './generate-ghp.page';

describe('GenerateGHPPage', () => {
  let component: GenerateGHPPage;
  let fixture: ComponentFixture<GenerateGHPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateGHPPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateGHPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

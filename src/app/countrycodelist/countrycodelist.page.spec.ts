import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrycodelistPage } from './countrycodelist.page';

describe('CountrycodelistPage', () => {
  let component: CountrycodelistPage;
  let fixture: ComponentFixture<CountrycodelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrycodelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrycodelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

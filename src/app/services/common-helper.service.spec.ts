import { TestBed } from '@angular/core/testing';

import { CommonHelperService } from './common-helper.service';

describe('CommonHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonHelperService = TestBed.get(CommonHelperService);
    expect(service).toBeTruthy();
  });
});

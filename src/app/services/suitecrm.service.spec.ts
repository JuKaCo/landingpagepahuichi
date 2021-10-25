import { TestBed } from '@angular/core/testing';

import { SuitecrmService } from './suitecrm.service';

describe('SuitecrmService', () => {
  let service: SuitecrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuitecrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

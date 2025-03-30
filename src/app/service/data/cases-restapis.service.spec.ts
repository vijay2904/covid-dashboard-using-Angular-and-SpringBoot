import { TestBed } from '@angular/core/testing';

import { CasesRESTAPIsService } from './cases-restapis.service';

describe('CasesRESTAPIsService', () => {
  let service: CasesRESTAPIsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasesRESTAPIsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

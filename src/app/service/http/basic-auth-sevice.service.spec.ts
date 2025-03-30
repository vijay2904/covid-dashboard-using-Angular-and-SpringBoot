import { TestBed } from '@angular/core/testing';

import { BasicAuthSeviceService } from './basic-auth-sevice.service';

describe('BasicAuthSeviceService', () => {
  let service: BasicAuthSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

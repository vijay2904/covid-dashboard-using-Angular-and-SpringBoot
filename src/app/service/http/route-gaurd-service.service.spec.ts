import { TestBed } from '@angular/core/testing';

import { RouteGaurdServiceService } from './route-gaurd-service.service';

describe('RouteGaurdServiceService', () => {
  let service: RouteGaurdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGaurdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

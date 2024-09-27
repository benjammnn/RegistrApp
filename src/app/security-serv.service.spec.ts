import { TestBed } from '@angular/core/testing';

import { SecurityServService } from './security-serv.service';

describe('SecurityServService', () => {
  let service: SecurityServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

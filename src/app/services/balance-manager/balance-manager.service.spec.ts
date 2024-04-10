import { TestBed } from '@angular/core/testing';

import { BalanceManagerService } from './balance-manager.service';

describe('BalanceManagerService', () => {
  let service: BalanceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

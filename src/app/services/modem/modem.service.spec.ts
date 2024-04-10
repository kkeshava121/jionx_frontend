import { TestBed } from '@angular/core/testing';

import { ModemService } from './modem.service';

describe('ModemService', () => {
  let service: ModemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

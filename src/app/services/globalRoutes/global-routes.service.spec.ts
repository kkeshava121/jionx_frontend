import { TestBed } from '@angular/core/testing';

import { GlobalRoutesService } from './global-routes.service';

describe('GlobalRoutesService', () => {
  let service: GlobalRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

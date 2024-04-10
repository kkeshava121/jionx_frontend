import { TestBed } from '@angular/core/testing';

import { SmsInboxsService } from './sms-inboxs.service';

describe('SmsInboxsService', () => {
  let service: SmsInboxsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsInboxsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

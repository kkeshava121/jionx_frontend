import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsInboxSearchComponent } from './sms-inbox-search.component';

describe('SmsInboxSearchComponent', () => {
  let component: SmsInboxSearchComponent;
  let fixture: ComponentFixture<SmsInboxSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsInboxSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsInboxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsInboxsComponent } from './sms-inboxs.component';

describe('SmsInboxsComponent', () => {
  let component: SmsInboxsComponent;
  let fixture: ComponentFixture<SmsInboxsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsInboxsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsInboxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

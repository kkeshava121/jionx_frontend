import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceManagerComponent } from './balance-manager.component';

describe('BalanceManagerComponent', () => {
  let component: BalanceManagerComponent;
  let fixture: ComponentFixture<BalanceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

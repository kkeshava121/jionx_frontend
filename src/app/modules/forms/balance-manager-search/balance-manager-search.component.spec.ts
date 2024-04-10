import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceManagerSearchComponent } from './balance-manager-search.component';

describe('BalanceManagerSearchComponent', () => {
  let component: BalanceManagerSearchComponent;
  let fixture: ComponentFixture<BalanceManagerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceManagerSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

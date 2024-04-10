import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemSearchComponent } from './modem-search.component';

describe('ModemSearchComponent', () => {
  let component: ModemSearchComponent;
  let fixture: ComponentFixture<ModemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModemSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

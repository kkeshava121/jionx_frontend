import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemComponent } from './modem.component';

describe('ModemComponent', () => {
  let component: ModemComponent;
  let fixture: ComponentFixture<ModemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

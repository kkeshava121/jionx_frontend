import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemSettingsComponent } from './modem-settings.component';

describe('ModemSettingsComponent', () => {
  let component: ModemSettingsComponent;
  let fixture: ComponentFixture<ModemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModemSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

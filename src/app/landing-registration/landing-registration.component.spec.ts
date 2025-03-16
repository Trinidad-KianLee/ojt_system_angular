import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingRegistrationComponent } from './landing-registration.component';

describe('LandingRegistrationComponent', () => {
  let component: LandingRegistrationComponent;
  let fixture: ComponentFixture<LandingRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

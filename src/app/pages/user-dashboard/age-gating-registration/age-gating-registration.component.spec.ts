import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGatingRegistrationComponent } from './age-gating-registration.component';

describe('AgeGatingRegistrationComponent', () => {
  let component: AgeGatingRegistrationComponent;
  let fixture: ComponentFixture<AgeGatingRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeGatingRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeGatingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

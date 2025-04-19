import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsLicenseRegistrationComponent } from './ps-license-registration.component';

describe('PsLicenseRegistrationComponent', () => {
  let component: PsLicenseRegistrationComponent;
  let fixture: ComponentFixture<PsLicenseRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsLicenseRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsLicenseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

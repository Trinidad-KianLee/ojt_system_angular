import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsAgeGatingComponent } from './terms-conditions-age-gating.component';

describe('TermsConditionsAgeGatingComponent', () => {
  let component: TermsConditionsAgeGatingComponent;
  let fixture: ComponentFixture<TermsConditionsAgeGatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsConditionsAgeGatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionsAgeGatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

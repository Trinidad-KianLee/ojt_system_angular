import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageRetailerComponent } from './landing-page-retailer.component';

describe('LandingPageRetailerComponent', () => {
  let component: LandingPageRetailerComponent;
  let fixture: ComponentFixture<LandingPageRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageRetailerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

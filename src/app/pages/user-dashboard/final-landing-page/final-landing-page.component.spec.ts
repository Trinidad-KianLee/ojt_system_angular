import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalLandingPageComponent } from './final-landing-page.component';

describe('FinalLandingPageComponent', () => {
  let component: FinalLandingPageComponent;
  let fixture: ComponentFixture<FinalLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

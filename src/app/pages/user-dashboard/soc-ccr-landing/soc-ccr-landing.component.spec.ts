import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocCcrLandingComponent } from './soc-ccr-landing.component';

describe('SocCcrLandingComponent', () => {
  let component: SocCcrLandingComponent;
  let fixture: ComponentFixture<SocCcrLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocCcrLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocCcrLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

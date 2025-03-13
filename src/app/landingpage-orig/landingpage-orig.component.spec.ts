import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageOrigComponent } from './landingpage-orig.component';

describe('LandingpageOrigComponent', () => {
  let component: LandingpageOrigComponent;
  let fixture: ComponentFixture<LandingpageOrigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageOrigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageOrigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

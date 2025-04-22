import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PslicenseLandingComponent } from './pslicense-landing.component';

describe('PslicenseLandingComponent', () => {
  let component: PslicenseLandingComponent;
  let fixture: ComponentFixture<PslicenseLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PslicenseLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PslicenseLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

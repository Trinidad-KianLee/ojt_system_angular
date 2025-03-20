import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGatingComponent } from './age-gating.component';

describe('AgeGatingComponent', () => {
  let component: AgeGatingComponent;
  let fixture: ComponentFixture<AgeGatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeGatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeGatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

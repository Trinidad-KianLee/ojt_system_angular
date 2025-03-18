import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGatingRegComponent } from './age-gating-reg.component';

describe('AgeGatingRegComponent', () => {
  let component: AgeGatingRegComponent;
  let fixture: ComponentFixture<AgeGatingRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeGatingRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeGatingRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

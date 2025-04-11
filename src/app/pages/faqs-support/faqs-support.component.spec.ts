import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsSupportComponent } from './faqs-support.component';

describe('FaqsSupportComponent', () => {
  let component: FaqsSupportComponent;
  let fixture: ComponentFixture<FaqsSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

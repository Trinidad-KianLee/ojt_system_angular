import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsIndustryComponent } from './faqs-industry.component';

describe('FaqsIndustryComponent', () => {
  let component: FaqsIndustryComponent;
  let fixture: ComponentFixture<FaqsIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsIndustryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsGeneralComponent } from './faqs-general.component';

describe('FaqsGeneralComponent', () => {
  let component: FaqsGeneralComponent;
  let fixture: ComponentFixture<FaqsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

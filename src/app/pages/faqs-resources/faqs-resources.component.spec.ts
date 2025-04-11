import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsResourcesComponent } from './faqs-resources.component';

describe('FaqsResourcesComponent', () => {
  let component: FaqsResourcesComponent;
  let fixture: ComponentFixture<FaqsResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

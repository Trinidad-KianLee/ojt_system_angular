import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRegisComponent } from './retailer-regis.component';

describe('RetailerRegisComponent', () => {
  let component: RetailerRegisComponent;
  let fixture: ComponentFixture<RetailerRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailerRegisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

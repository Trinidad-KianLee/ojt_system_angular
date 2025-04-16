import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoEventsComponent } from './promo-events.component';

describe('PromoEventsComponent', () => {
  let component: PromoEventsComponent;
  let fixture: ComponentFixture<PromoEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

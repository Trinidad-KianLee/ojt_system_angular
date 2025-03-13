import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  WarehouseRegComponent } from './warehouse-reg.component';

describe('LandingPageComponent', () => {
  let component:  WarehouseRegComponent;
  let fixture: ComponentFixture< WarehouseRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

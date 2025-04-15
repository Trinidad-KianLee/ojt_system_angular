import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VapingAreaComponent } from './vaping-area.component';

describe('VapingAreaComponent', () => {
  let component: VapingAreaComponent;
  let fixture: ComponentFixture<VapingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VapingAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VapingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

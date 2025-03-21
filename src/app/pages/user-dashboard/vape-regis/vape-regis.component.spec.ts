import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VapeRegisComponent } from './vape-regis.component';

describe('VapeRegisComponent', () => {
  let component: VapeRegisComponent;
  let fixture: ComponentFixture<VapeRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VapeRegisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VapeRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

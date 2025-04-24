import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocCcrRegisterComponent } from './soc-ccr-register.component';

describe('SocCcrRegisterComponent', () => {
  let component: SocCcrRegisterComponent;
  let fixture: ComponentFixture<SocCcrRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocCcrRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocCcrRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRegistrationComponent } from './warehouse-registrationcomponent';

describe('WarehouseRegistrationComponent', () => {
  let component: WarehouseRegistrationComponent;
  let fixture: ComponentFixture<WarehouseRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

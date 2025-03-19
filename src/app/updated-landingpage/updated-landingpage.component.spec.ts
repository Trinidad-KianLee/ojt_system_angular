import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedLandingpageComponent } from './updated-landingpage.component';

describe('UpdatedLandingpageComponent', () => {
  let component: UpdatedLandingpageComponent;
  let fixture: ComponentFixture<UpdatedLandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedLandingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

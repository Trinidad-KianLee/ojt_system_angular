import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLandingpageComponent } from './new-landingpage.component';

describe('NewLandingpageComponent', () => {
  let component: NewLandingpageComponent;
  let fixture: ComponentFixture<NewLandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLandingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

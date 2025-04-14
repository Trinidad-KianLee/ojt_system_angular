import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmvComponent } from './osmv.component';

describe('OsmvComponent', () => {
  let component: OsmvComponent;
  let fixture: ComponentFixture<OsmvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsmvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsmvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

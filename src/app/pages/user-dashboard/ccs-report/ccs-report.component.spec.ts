import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsReportComponent } from './ccs-report.component';

describe('CcsReportComponent', () => {
  let component: CcsReportComponent;
  let fixture: ComponentFixture<CcsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

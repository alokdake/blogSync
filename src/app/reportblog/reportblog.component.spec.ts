import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportblogComponent } from './reportblog.component';

describe('ReportblogComponent', () => {
  let component: ReportblogComponent;
  let fixture: ComponentFixture<ReportblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportblogComponent]
    });
    fixture = TestBed.createComponent(ReportblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteblogComponent } from './deleteblog.component';

describe('DeleteblogComponent', () => {
  let component: DeleteblogComponent;
  let fixture: ComponentFixture<DeleteblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteblogComponent]
    });
    fixture = TestBed.createComponent(DeleteblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePastRequestComponent } from './employee-past-request.component';

describe('EmployeePastRequestComponent', () => {
  let component: EmployeePastRequestComponent;
  let fixture: ComponentFixture<EmployeePastRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeePastRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePastRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

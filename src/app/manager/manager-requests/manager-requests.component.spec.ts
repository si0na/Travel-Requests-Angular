import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRequestsComponent } from './manager-requests.component';

describe('ManagerRequestsComponent', () => {
  let component: ManagerRequestsComponent;
  let fixture: ComponentFixture<ManagerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

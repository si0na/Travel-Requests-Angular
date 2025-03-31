import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSidebarComponent } from './navbar-sidebar.component';

describe('NavbarSidebarComponent', () => {
  let component: NavbarSidebarComponent;
  let fixture: ComponentFixture<NavbarSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateRequestComponent } from './employee-create-request/employee-create-request.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarSidebarComponent } from './navbar-sidebar/navbar-sidebar.component';
import { EmployeePastRequestComponent } from './employee-past-request/employee-past-request.component';


@NgModule({
  declarations: [
    EmployeeCreateRequestComponent,
    EmployeePastRequestComponent,
    NavbarSidebarComponent,
      
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    FormsModule
  ],
  exports: [NavbarSidebarComponent]
})
export class EmployeeModule { }

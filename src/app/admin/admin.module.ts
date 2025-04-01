import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    NavbarComponent,
    EmployeeListComponent,
    AdminRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  exports: [NavbarComponent]
})
export class AdminModule { }

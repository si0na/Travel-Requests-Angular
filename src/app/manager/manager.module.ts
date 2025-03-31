import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component';
import { NavbarSidebarComponent } from './navbar-sidebar/navbar-sidebar.component';


@NgModule({
  declarations: [
    ManagerRequestsComponent,
    NavbarSidebarComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule
  ],
  exports: [NavbarSidebarComponent]

})
export class ManagerModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateRequestComponent } from './employee-create-request/employee-create-request.component';
import { EmployeePastRequestComponent } from './employee-past-request/employee-past-request.component';
const routes: Routes = [
  { path: 'create-request', component: EmployeeCreateRequestComponent },
  { path: 'past-requests', component: EmployeePastRequestComponent },
  { path: '', redirectTo: 'create-request', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
